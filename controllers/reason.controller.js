const { fetchReasons } = require("../models/reason.model.js");

function getReasons(req, res) {
  return fetchReasons().then((reasons) => {
    res.status(200).send({ reasons: reasons });
  });
}

module.exports = { getReasons };
