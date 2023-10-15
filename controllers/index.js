const { queryRecord } = require("./record");

exports.odataApi = async (req, res) => {
  queryRecord(req, res);
};
