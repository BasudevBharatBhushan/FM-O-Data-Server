var express = require("express");
var router = express.Router();

const { odataApi } = require("../controllers/index");

router.get("/odataApi/:fmServer/:database/:table", odataApi);

module.exports = router;
