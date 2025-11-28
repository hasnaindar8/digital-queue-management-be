const { server } = require("./app.js");

const { PORT = 8080 } = process.env;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}...`);
});
