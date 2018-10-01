const express = require("express");
const router = express.Router();

// @route /api/users/test
// @desc Test Route
// @access public
router.get("/test", (req, res) => res.json({ msg: "User API is working" }));

module.exports = router;
