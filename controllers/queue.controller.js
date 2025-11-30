const {
  deleteQueueEntry,
  insertQueueEntry,
} = require("../models/queue.model.js");
const socketService = require("../services/socketService.js");

function removePatient(req, res) {
  const { entry_id, user_id } = req.params;
  return deleteQueueEntry(entry_id)
    .then(() => {
      socketService.removeUserFromSockets(Number(user_id));

      return socketService.broadcastQueueUpdate();
    })
    .then(() => {
      res.status(204).send();
    });
}

function addQueueEntry(req, res) {
  const { user_id, reason_id } = req.body;

  if (typeof user_id !== "number" || typeof reason_id !== "number") {
    return Promise.reject({ status: 400, msg: "Bad Request" });
  }

  return insertQueueEntry(user_id, reason_id).then((entry) => {
    res.status(201).send({ queueEntry: entry });
  });
}

module.exports = { removePatient, addQueueEntry };
