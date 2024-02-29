require("dotenv").config();
const axios = require("axios");
const https = require("https");
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

exports.executeScript = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];

  const { fmServer, database, table } = req.params;
  const { scriptName, scriptParam } = req.body;

  const apiUrl = `https://${fmServer}/fmi/odata/v4/${database}/Script.${scriptName}`;

  const headers = {
    Authorization: `Basic ${token}`,
  };

  const body = {
    scriptParameterValue: scriptParam,
  };

  try {
    const response = await axios.post(apiUrl, body, {
      headers,
      httpsAgent,
    });

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json(error);
  }
};
