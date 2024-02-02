var express = require("express");
var router = express.Router();

const { handleRequest, sendGrid } = require("../controllers/index");

router.get("/odataApi/:fmServer/:database/:table", handleRequest);
router.post("/odataApi/:fmServer/:database/:table", handleRequest);
router.patch("/odataApi/:fmServer/:database/:table", handleRequest);
router.delete("/odataApi/:fmServer/:database/:table", handleRequest);

// SendGrid
router.post("/sendgrid", sendGrid);

module.exports = router;
