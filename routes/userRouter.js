const router = require("express").Router();
const {
  signUp,
  login,
  passwordReset,
} = require("../controllers/authController");

router.post("/signup", signUp);
router.post("/login", login);
router.post("/reset", passwordReset);
module.exports = router;
