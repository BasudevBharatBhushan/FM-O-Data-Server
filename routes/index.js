var express = require("express");
var router = express.Router();

const {
  handleRequest,
  sendGrid,
  executeScript,
  getTableMetadata,
} = require("../controllers/index");

// Get Table Metadata
router.get("/odataApi/:fmServer/:database/\\$metadata", getTableMetadata);

router.get("/odataApi/:fmServer/:database/:table", handleRequest);
router.post("/odataApi/:fmServer/:database/:table", handleRequest);
router.patch("/odataApi/:fmServer/:database/:table", handleRequest);
router.delete("/odataApi/:fmServer/:database/:table", handleRequest);

// SendGrid
router.post("/sendgrid", sendGrid);

//ExecuteScript
router.post(
  "/odataApi/executeScript/:fmServer/:database/:table",
  executeScript
);

module.exports = router;
