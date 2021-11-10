const express = require("express");
const { signup, signin } = require("../controllers/auth");

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/signout");

module.exports = router;
