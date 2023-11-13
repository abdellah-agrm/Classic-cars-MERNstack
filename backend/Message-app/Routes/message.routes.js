const express = require("express");
const router = express.Router();
const auth = require("../../User-app/Middleware/auth");
const messageSchema = require("../Models/Message");

// Add report :
router.post("/contact", auth, async (req, res) => {
  try {
    const { usernameMsg, emailMsg, photoMsg, subject, textMsg } = req.body;
    const userId = req.user.id;

    const report = new messageSchema({ userId, usernameMsg, emailMsg, photoMsg, subject, textMsg, typeMsg: "report" });
    await report.save();
    res.json({
      report: report,
      message: "Report added successfully.",
      status: 201,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Add opinion :
router.post("/opinion", auth, async (req, res) => {
  try {
    const { usernameMsg, emailMsg, photoMsg, textMsg } = req.body;
    const userId = req.user.id;

    const opinion = new messageSchema({ userId, usernameMsg, emailMsg, photoMsg, textMsg, typeMsg: "opinion" });
    await opinion.save();
    res.json({
      opinion: opinion,
      message: "Opinion added successfully.",
      status: 201,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// READ all reports 
router.get("/all-contacts", auth, async (req, res, next) => {
  try {
    const reports = await messageSchema.find({ typeMsg: "report" });
    res.json({
      data: reports,
      message: "All approved reports successfully fetched.",
      status: 200,
    });
  } catch (err) {
    next(err);
  }
});

// READ all opinions 
router.get("/all-opinions", async (req, res, next) => {
  try {
    const opinions = await messageSchema.find({ typeMsg: "opinion", statusMsg: "approved" });
    res.json({
      data: opinions,
      message: "All approved opinions successfully fetched.",
      status: 200,
    });
  } catch (err) {
    next(err);
  }
});


module.exports = router;