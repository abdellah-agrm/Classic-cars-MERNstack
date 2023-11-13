const express = require("express");
const router = express.Router();
const auth = require("../../User-app/Middleware/auth");
const favoriteSchema = require("../Models/Favorite");
const carSchema = require("../../Cars-app/Models/Car");

// Add favorite
router.post("/add-to-favorites/:carId", auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const carId = req.params.carId;

    const fav = await favoriteSchema.findOne({ carId: carId, userId: userId });
    if (fav) {
      return res.status(400).json({ msg: "Car is already in favorites" });
    } else {
      const newfav = new favoriteSchema({ userId, carId });
      await newfav.save();
      res.status(200).json({ msg: "Car added to favorites" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Delete favorite
router.delete("/delete-from-favorites/:carId", auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const carId = req.params.carId;

    const fav = await favoriteSchema.findOne({ carId: carId, userId: userId });
    if (!fav) {
      return res.status(400).json({ msg: "Car is not in favorites" });
    } else {
      await favoriteSchema.deleteOne({ userId: userId, carId: carId });
      res.status(200).json({ msg: "Car removed from favorites" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});


// Get one user favorite 
router.get("/myfavorite-cars/:carId", auth, async (req, res) => {
  try {
    const carId = req.params.carId;
    const userId = req.user.id;
    const favoriteCars = await favoriteSchema.findOne({ userId: userId, carId: carId });

    res.status(200).json({ favoriteCars });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Get all user's favorite cars
router.get("/myfavorite-cars", auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const favoriteCars = await favoriteSchema.find({ userId: userId })

    res.status(200).json({ favoriteCars });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Get all user's favorites cars with details of cars
router.get("/myfavorite-cars-detailed", auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const favoriteCars = await favoriteSchema.find({ userId: userId });
    const detailedFavoriteCars = [];

    for (const favorite of favoriteCars) {
      const carId = favorite.carId;

      // Find the corresponding car details
      const carDetails = await carSchema.findOne({ id: carId, status: "approved" });

      if (carDetails) {
        detailedFavoriteCars.push({
          model: carDetails.model,
          brand: carDetails.brand,
          details: carDetails.details,
          year: carDetails.year,
          maxSpeed: carDetails.maxSpeed,
          img: carDetails.img,
          userId: carDetails.userId,
          status: carDetails.status,
          id: carDetails.id,
        });
      }
    }

    res.status(200).json({ favoriteCars: detailedFavoriteCars });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;