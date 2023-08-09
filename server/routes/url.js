const express = require("express");
const {handleGenerateURL, handleGetAnalytics} = require("../controllers/url")

const router = express.Router();

router.post("/", handleGenerateURL);
router.get("/:shortID", handleGetAnalytics);

module.exports = router;