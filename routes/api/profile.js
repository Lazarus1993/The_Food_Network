const express = require("express");
const router = express.Router();

// @route /api/profile/test
// @desc Test Route
// @access public
router.get("/test", (req, res) => res.json({ msg: "Profile API is working" }));

module.exports = router;
