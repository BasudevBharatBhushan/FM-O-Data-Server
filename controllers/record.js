require("dotenv").config();
const axios = require("axios");
const https = require("https");
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

exports.queryRecord = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];

  // const { query, param } = req.query;
  const { fmServer, database, table } = req.params;

  const apiUrl = `https://${fmServer}/fmi/odata/v4/${database}/${table}`;

  const headers = {
    Authorization: `Basic ${token}`,
  };

  try {
    const response = await axios.get(apiUrl, {
      params: req.query,
      headers,
      httpsAgent,
      paramsSerializer: (params) => {
        // Sample implementation of query string building
        let result = "";
        Object.keys(params).forEach((key) => {
          result += `${key}=${encodeURIComponent(params[key])}&`;
        });

        return result.substring(0, result.length - 1);
      },
    });

    // console.log(response);
    res.status(200).json(response.data.value);
  } catch (error) {
    // console.log(error);
    res.status(500).json(error);
  }
};
