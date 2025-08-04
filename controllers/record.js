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

exports.postRecord = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];

  const { fmServer, database, table } = req.params;

  const apiUrl = `https://${fmServer}/fmi/odata/v4/${database}/${table}`;

  const headers = {
    Authorization: `Basic ${token}`,
  };

  try {
    const response = await axios.post(apiUrl, req.body, {
      headers,
      httpsAgent,
    });

    // console.log(response);
    res.status(200).json(response.data);
  } catch (error) {
    // console.log(error);
    res.status(500).json(error);
  }
};

exports.updateRecord = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];

  const { fmServer, database, table } = req.params;

  const apiUrl = `https://${fmServer}/fmi/odata/v4/${database}/${table}`;

  const headers = {
    Authorization: `Basic ${token}`,
  };

  try {
    const response = await axios.patch(apiUrl, req.body, {
      headers,
      httpsAgent,
    });

    // console.log(response);
    res.status(200).json(response.data);
  } catch (error) {
    // console.log(error);
    res.status(500).json(error);
  }
};

exports.deleteRecord = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];

  const { fmServer, database, table } = req.params;

  const apiUrl = `https://${fmServer}/fmi/odata/v4/${database}/${table}`;

  const headers = {
    Authorization: `Basic ${token}`,
  };

  try {
    const response = await axios.delete(apiUrl, {
      headers,
      httpsAgent,
    });

    // console.log(response);
    res.status(200).json(response.data);
  } catch (error) {
    // console.log(error);
    res.status(500).json(error);
  }
};

exports.getTableMetadata = async (req, res) => {
  console.log("getTableMetadata called");
  const token = req.headers.authorization.split(" ")[1];

  const { fmServer, database } = req.params;

  const apiUrl = `https://${fmServer}/fmi/odata/v4/${database}/$metadata`;

  const headers = {
    Authorization: `Basic ${token}`,
  };

  try {
    const response = await axios.get(apiUrl, {
      headers,
      // httpsAgent,
    });

    // console.log(response);
    res.status(200).json(response.data);
  } catch (error) {
    // console.log(error);
    res.status(500).json(error);
  }
};
