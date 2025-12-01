const { Server } = require("socket.io");
const { getQueueEntries } = require("../models/queue.model.js");

class SocketService {
  constructor() {
    this.io = null;
    this.socketsByUser = {}; // userId -> Set of socketIds
  }

  initialize(server) {
    this.io = new Server(server, {
      cors: {
        origin: "*",
      },
    });

    // Authentication middleware
    this.io.use((socket, next) => {
      try {
        const { id, type } = socket.handshake.auth.token;

        const userId = Number(id);
        const userType = type || "patient";

        if (!userId) throw new Error("Invalid token - userId missing");

        socket.userId = userId;
        socket.userType = userType;

        next();
      } catch (error) {
        next(new Error("Socket Authentication failed"));
      }
    });

    this.io.on("connection", (socket) => this.handleConnection(socket));

    return this.io;
  }

  async handleConnection(socket) {
    const { userId, userType } = socket;

    console.log(
      `User ${userId} (${userType}) connected with socket ${socket.id}`
    );

    // Join private room
    if (userType === "receptionist") {
      socket.join("receptionist");
    } else {
      socket.join(`user:${userId}`);
      // Track socket
      this.socketsByUser[userId] ||= new Set();
      this.socketsByUser[userId].add(socket.id);
    }

    if (userType === "receptionist") {
      await this.broadcastQueueUpdate();
    }

    socket.on("disconnect", () => this.handleDisconnection(socket));
  }

  handleDisconnection(socket) {
    const { userId, userType } = socket;

    console.log(
      `User ${userId} (${userType}) disconnected with socket ${socket.id}`
    );

    if (!this.socketsByUser[userId]) return;

    this.socketsByUser[userId].delete(socket.id);

    if (this.socketsByUser[userId].size === 0) {
      delete this.socketsByUser[userId];
    }
  }

  computePositions(queue) {
    const positions = {}; // userId → position

    queue.forEach((entry, index) => {
      positions[entry.user_id] = index + 1;
    });

    return positions;
  }

  computeCumulativeWait(queue) {
    const cumulative = [];
    let running = 0;

    queue.forEach((entry) => {
      cumulative.push(running);
      running += entry.est_wait;
    });

    return cumulative;
  }

  async broadcastQueueUpdate() {
    const queue = await getQueueEntries();

    const positions = this.computePositions(queue);
    const cumulativeWait = this.computeCumulativeWait(queue);

    // Send each user their update
    Object.keys(positions).forEach((userId) => {
      const position = positions[userId];
      const index = position - 1;

      const update = {
        position,
        estimatedWait: cumulativeWait[index], // seconds
        queueLength: queue.length,
      };

      this.io.to(`user:${userId}`).emit("queue:update", update);
    });

    this.io.to("receptionist").emit("queue:length", {
      length: queue.length,
    });
  }

  removeUserFromSockets(userId) {
    const sockets = this.socketsByUser[userId];
    if (!sockets) return;

    sockets.forEach((socketId) => {
      const socket = this.io.sockets.sockets.get(socketId);
      if (socket) socket.disconnect(true);
    });

    delete this.socketsByUser[userId];
  }
}

const socketService = new SocketService();
module.exports = socketService;
