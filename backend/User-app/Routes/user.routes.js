const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../Models/User");
const auth = require("../Middleware/auth");
const DataCharts = require("../../Admin-app/Models/DataCharts");

const multer = require("multer");

// Define storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/profiles/"); // Store files in the "uploads" directory
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const uploadProfile = multer({ storage: storage });

// User Registration
router.post("/register", async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ msg: "Email already exists" });
    }

    const user = new User({ username, email, password, role, photo: null });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    const newData = new DataCharts({ signDate: new Date(), typeOfSign: "signup" });
    await newData.save();

    const payload = { user: { id: user.id } };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "7 days" },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// User Login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ msg: "Username or password incorrect" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Username or password incorrect" });
    }

    if(user.role !== "admin") {
      const newData = new DataCharts({ signDate: new Date(), typeOfSign: "signin" });
      await newData.save();
    }

    const payload = { user: { id: user.id } };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
      (err, token) => {
        if (err) throw err;
        res.json({ token, user });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Get User Info
router.get("/info", auth, async (req, res) => {
  try {
    const user = await User.findOne({ id: req.user.id }).select("-password");
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json(error);
  }
});

// Update User Information (including Password)
router.put("/update-info", auth, async (req, res) => {
  try {
    const { username, email, password, newPassword } = req.body;

    const user = await User.findOne({id: req.user.id});
    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    // Check if a new username is provided and update it
    if (username) {
      user.username = username;
    }

    // Check if a new email is provided and update it
    if (email) {
      user.email = email;
    }

    // Check if both current password and new password are provided
    if (password && newPassword) {
      // Verify the current password
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ msg: "Current password is incorrect" });
      }

      // Update the password with the new one
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
    }
    await user.save();

    res.status(200).json({ msg: "User information updated successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Add or update profile img :
router.put("/new-profile-img", auth, uploadProfile.single("photo"), async (req, res, next) => {
  try {
    const photo = req.file.filename;

    const user = await User.findOne({id: req.user.id});
    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }
    if (photo) {
      user.photo = photo;
    }

    await user.save();
    res.status(200).json({ 
      updateInfo: user,
      msg: "User information updated successfully" 
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;