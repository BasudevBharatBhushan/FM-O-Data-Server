require("dotenv").config();
const axios = require("axios");
const https = require("https");

exports.sendGrid = async (req, res) => {
  const url = "https://api.sendgrid.com/v3/mail/send";

  const headers = {
    Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
    "Content-Type": "application/json",
  };

  try {
    const response = await axios.post(url, req.body, {
      headers,
    });

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json(error);
  }
};
