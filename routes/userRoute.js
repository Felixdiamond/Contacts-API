const express = require("express");
const router = express.Router();
const validateToken = require("../middleware/validateTokenHandler");

const { registerUser, loginUser, currentUser, refreshUser } = require("../controllers/userController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh-token", refreshUser);
router.get("/current", validateToken, currentUser);

module.exports = router;