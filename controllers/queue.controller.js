const { insertQueueEntry } = require("../models/queue.model.js");

function addQueueEntry(req, res) {
  const requestBody = req.body;
  return insertQueueEntry(requestBody).then(() => {
    res.status(201).send();
  });

//   const { article_id } = req.params;
//   const { username, body } = req.body;

//   if (typeof username === "string" && typeof body === "string") {
//     return checkArticleExists(article_id)
//       .then(() => {
//         return insertCommentToArticle(username, body, article_id);
//       })
//       .then((comment) => {
//         res.status(201).send({ comment: comment });
//       });
//   } else {
//     return Promise.reject({ status: 400, msg: "You have made a bad request" });
//   }
}

module.exports = { addQueueEntry };
