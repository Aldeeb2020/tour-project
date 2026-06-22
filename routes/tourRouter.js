const router = require("express").Router();
const { getAllTours, getTour } = require("../controllers/tourController");
const { protect, restrictTo } = require("../controllers/authController");

router.route("/").get(protect, restrictTo("admin"), getAllTours);
router.route("/:id").get(getTour);
module.exports = router;
