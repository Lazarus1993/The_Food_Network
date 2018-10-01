const express = require("express");
const router = express.Router();

// @route /api/reviews/test
// @desc Test Route
// @access public
router.get("/test", (req, res) => res.json({ msg: "Review API is working" }));

module.exports = router;
