const express = require("express");
const router = express.Router();
const auth = require("../../User-app/Middleware/auth");
const carSchema = require("../Models/Car");
const userSchema = require("../../User-app/Models/User");
const multer = require("multer");

// Define storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/cars/"); // Store files in the "uploads" directory
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });


// READ Cars
router.get("/", auth, async (req, res, next) => {
  try {
    const cars = await carSchema.find({ status: "approved" });
    res.json({
      data: cars,
      message: "All approved items successfully fetched.",
      status: 200,
    });
  } catch (err) {
    next(err);
  }
});

// Get Car by Id
router.get("/get-car/:id", async (req, res, next) => {
  await carSchema.findOne({ id: req.params.id, status: "approved" })
    .then((result) => {
      res.json({
        data: result,
        message: "Data successfully fetched.",
        status: 200,
      });
    })
    .catch((err) => {
      return next(err);
    });
});

// Create Car
router.post("/new-car", auth, upload.single("img"), async (req, res, next) => {
  try {
    const { model, brand, details, year, maxSpeed } = req.body;
    const userId = req.user.id;

    // Get the filename of the uploaded image
    const img = req.file.filename;

    const car = new carSchema({ model, brand, details, year, maxSpeed, img, userId, status: "pending" });
    await car.save();
    res.json({
      data: car,
      message: "Car added successfully.",
      status: 201,
    });
  } catch (err) {
    next(err);
  }
});

// Update Car
router.put("/update-car/:id", auth, upload.single("img"), async (req, res, next) => {
  try {
    const { model, brand, details, year, maxSpeed } = req.body;
    const { id } = req.params;
    const userId = req.user.id;
    const car = await carSchema.findOne({ id: id });

    if (!car) {
      return res.status(404).json({ msg: "Car not found or unauthorized." });
    }

    if (car.userId.toString() !== userId) {
      return res.status(403).json({ msg: "You do not have permission to update this car." });
    }

    if (req.file && req.file.name) { 
      car.img = req.file.name;
    }
    car.model = model;
    car.brand = brand;
    car.details = details;
    car.year = year;
    car.maxSpeed = maxSpeed;

    await car.save();
    res.json({
      data: car,
      message: "Car updated successfully.",
      status: 200,
    });
  } catch (err) {
    console.error("Car update error:", err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
});


// Delete Car
router.delete("/delete-car/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const car = await carSchema.findOne({ id: id, userId });
    if (!car) {
      const user = await userSchema.findOne({ id: userId });
      if (!user || user.role !== "admin") {
        return res.status(404).json({ msg: "Unauthorized!" });
      }
    }
    await carSchema.deleteOne({ id: car.id });
    res.json({
      message: "Car deleted successfully.",
      status: 200,
    });
  } catch (err) {
    next(err);
  }
});

// Get My collection :
router.get("/mycollection", auth, async (req, res, next) => {
  const userId = req.user.id;
  await carSchema.find({ userId: userId, status: "approved" })
    .then((result) => {
      res.json({
        mycollection: result,
        message: "Data successfully fetched.",
        status: 200,
      });
    })
    .catch((err) => {
      return next(err);
    });
});

module.exports = router;
