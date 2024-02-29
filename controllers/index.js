const {
  queryRecord,
  updateRecord,
  deleteRecord,
  postRecord,
} = require("./record");

const { executeScript } = require("./script");

const { sendGrid } = require("./sendgrid");

const handleRequest = (req, res) => {
  const method = req.method.toLowerCase();

  switch (method) {
    case "get":
      return queryRecord(req, res);
    case "post":
      return postRecord(req, res);
    case "patch":
      return updateRecord(req, res);
    case "delete":
      return deleteRecord(req, res);
    default:
      res.status(405).send("Method Not Allowed");
  }
};

module.exports = {
  handleRequest,
  queryRecord,
  postRecord,
  updateRecord,
  deleteRecord,
  sendGrid,
  executeScript,
};
