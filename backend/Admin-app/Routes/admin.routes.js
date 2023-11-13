const express = require("express");
const router = express.Router();
const auth = require("../../User-app/Middleware/auth");
const carSchema = require("../../Cars-app/Models/Car");
const userSchema = require("../../User-app/Models/User");
const messageSchema = require("../../Message-app/Models/Message");
const DataCharts = require("../Models/DataCharts");
const { sign } = require("jsonwebtoken");

// ================================== Cars ===================================
// Approving data :
router.get("/admin-cars", auth, async (req, res, next) => {
  try {
    const user = await userSchema.findOne({id: req.user.id});
    if (user.role === "admin"){
      const cars = await carSchema.find({});
      res.json({
        data: cars,
        message: "All items successfully fetched.",
        status: 200,
      });
    }else{
      res.status(404).json({message: "Only for admins."})
    }
  } catch (err) {
    next(err);
  }
});

// Approved or rejected data : 
router.put("/status-cars/:id", auth, async (req, res, next) => {
  try {
    const user = await userSchema.findOne({id: req.user.id});
    if (user.role === "admin"){
      const { status } = req.body;
      const { id } = req.params;
      const car = await carSchema.findOne({ id: id });
      if (!car) {
        return res.status(404).json({ msg: "this car not found!" });
      }

      if (status === "rejected") {
        const currentDate = new Date();
        if (car.status !== "rejected") {
          car.rejectedDate = currentDate;
        }
      } else {
        car.rejectedDate = undefined;
      }
      
      car.status = status;
      await car.save();
      res.json({
        data: car,
        message: "Car approved successfully.",
        status: 200,
      });
    }else{
      res.status(404).json({message: "Only for admins."});
    }
  } catch (err) {
    next(err);
  }
});

// ================================== Users ===================================
// Gestion users :
router.get("/users", auth, async (req, res, next) => {
  try{
    const user = await userSchema.findOne({id: req.user.id});
    if (user.role === "admin"){
      const users = await userSchema.find({ role: "user" });
      res.json({
        data: users,
        message: "All users successfully fetched.",
        status: 200,
      });
    }else{
      res.status(404).json({message: "Only for admins."});
    }
  }catch (err){
    next(err);
  }
});

// Block users :
router.put("/block-user/:id", auth, async (req, res, next) => {
  try {
    const user = await userSchema.findOne({id: req.user.id});
    if (user.role === "admin"){
      const { id } = req.params;
      const {block} = req.body;
      const blockuser = await userSchema.findOne({ id: id });
      if (!blockuser) {
        return res.status(404).json({ msg: "this opinon not found!" });
      }
      blockuser.block = block;
      await blockuser.save();
      res.json({
        data: blockuser,
        message: "User blocked successfully.",
        status: 200,
      });
    }else{
      res.status(404).json({message: "Only for admins."});
    }
  } catch (err) {
    next(err);
  }
});

// Delete user:
router.delete("/delete-user/:id", auth, async (req, res, next) => {
  try {
    const user = await userSchema.findOne({ id: req.user.id });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    if (user.role === "admin") {
      await userSchema.deleteOne({ id: req.params.id }); 
      return res.json({
        message: "User deleted successfully.",
        status: 200,
      });
    } else {
      return res.status(403).json({ message: "Only for admins." });
    }
  } catch (err) {
    next(err);
  }
});

// ================================== Opinions ===================================
// Approving data :
router.get("/admin-opinions", auth, async (req, res, next) => {
  try {
    const user = await userSchema.findOne({id: req.user.id});
    if (user.role === "admin"){
      const opinions = await messageSchema.find({ typeMsg: "opinion" });
      res.json({
        data: opinions,
        message: "All items successfully fetched.",
        status: 200,
      });
    }else{
      res.status(404).json({message: "Only for admins."})
    }
  } catch (err) {
    next(err);
  }
});

// Accepting data for opinions (status-opinions):
router.put("/status-opinion/:id", auth, async (req, res, next) => {
  try {
    const user = await userSchema.findOne({ id: req.user.id });
    if (user.role === "admin") {
      const { statusMsg } = req.body;
      const { id } = req.params;
      const opinion = await messageSchema.findOne({ id: id });
      if (!opinion) {
        return res.status(404).json({ msg: "This opinion not found!" });
      }
      if (statusMsg === "rejected") {
        const currentDate = new Date();
        if (opinion.statusMsg !== "rejected") {
          opinion.rejectedDate = currentDate;
        }
      } else {
        opinion.rejectedDate = undefined;
      }

      opinion.statusMsg = statusMsg;
      await opinion.save();
      res.json({
        data: opinion,
        message: "Opinion approved successfully.",
        status: 200,
      });
    } else {
      res.status(404).json({ message: "Only for admins." });
    }
  } catch (err) {
    next(err);
  }
});

// Delete opinion :
router.delete("/delete-opinion/:id", auth, async (req, res, next) => {
  try{
    const { opinionId } = req.params;
    const user = await userSchema.findOne({id: req.user.id});
    if (user.role === "admin"){
      await messageSchema.deleteOne({ id: opinionId });
      res.json({
        message: "Opinion deleted successfully.",
        status: 200,
      });
    }else{
      res.status(404).json({message: "Only for admins."});
    }
  }catch (err){
    next(err);
  }
});

// ================================== Reports ===================================
// Approving report :
router.get("/admin-reports", auth, async (req, res, next) => {
  try {
    const user = await userSchema.findOne({id: req.user.id});
    if (user.role === "admin"){
      const reports = await messageSchema.find({ typeMsg: "report" });
      res.json({
        data: reports,
        message: "All items successfully fetched.",
        status: 200,
      });
    }else{
      res.status(404).json({message: "Only for admins."})
    }
  } catch (err) {
    next(err);
  }
});

// Accepting data for reports (approving-report):
router.put("/status-report/:id", auth, async (req, res, next) => {
  try {
    const user = await userSchema.findOne({ id: req.user.id });
    if (user.role === "admin") {
      const { statusMsg } = req.body;
      const { id } = req.params;
      const report = await messageSchema.findOne({ id: id });
      if (!report) {
        return res.status(404).json({ msg: "This report not found!" });
      }

      if (statusMsg === "rejected") {
        const currentDate = new Date();
        if (report.statusMsg !== "rejected") {
          report.rejectedDate = currentDate;
        }
      } else {
        report.rejectedDate = undefined;
      }

      report.statusMsg = statusMsg;
      await report.save();
      res.json({
        data: report,
        message: "Report approved successfully.",
        status: 200,
      });
    } else {
      res.status(404).json({ message: "Only for admins." });
    }
  } catch (err) {
    next(err);
  }
});

// Delete report :
router.delete("/delete-report/:id", auth, async (req, res, next) => {
  try{
    const { reportId } = req.params;
    const user = await userSchema.findOne({id: req.user.id});
    if (user.role === "admin"){
      await messageSchema.deleteOne({ id: reportId });
      res.json({
        message: "Report deleted successfully.",
        status: 200,
      });
    }else{
      res.status(404).json({message: "Only for admins."});
    }
  }catch (err){
    next(err);
  }
});

// ================================== Cars & opinions stats ===================================

// counting data's cars & opinions
router.get("/data-doughnut", auth, async (req, res, next) => {
  try{
    const user = await userSchema.findOne({id: req.user.id});
    if (user.role === "admin"){
      // data cars :
      const pendingCars = await carSchema.find({status: "pending"}).count();
      const approvedCars = await carSchema.find({status: "approved"}).count();
      const rejectedCars = await carSchema.find({status: "rejected"}).count();

      // data opinions :
      const pendingOpinions = await messageSchema.find({typeMsg: "opinion", statusMsg: "pending"}).count();
      const approvedOpinions = await messageSchema.find({typeMsg: "opinion", statusMsg: "approved"}).count();
      const rejectedOpinions = await messageSchema.find({typeMsg: "opinion", statusMsg: "rejected"}).count();

      const dataCars = {pendingCars: pendingCars, approvedCars: approvedCars, rejectedCars: rejectedCars};
      const dataOpinions = {pendingOpinions: pendingOpinions, approvedOpinions: approvedOpinions, rejectedOpinions: rejectedOpinions};
      res.json({
        dataCars: dataCars,
        dataOpinions: dataOpinions,
        message: "All Items fetched successfully.",
        status: 200,
      });
    }else{
      res.status(404).json({message: "Only for admins."});
    }
  }catch (err){
    next(err);
  }
});

// ================================== Sign up & in stats ===================================
// Route for sign-in
router.post('/datacharts/signin', auth, async (req, res, next) => {  
  try {
    const { year } = req.body;
    if (!year) {
      return res.status(400).json({ error: 'Year parameter is required.' });
    }

    const user = await userSchema.findOne({id: req.user.id});
    if (user.role === "admin"){
      const startDate = new Date(year, 0, 1);
      const endDate = new Date(year, 12, 1);

      const result = await DataCharts.aggregate([
        {
          $match: {
            "typeOfSign": "signin",
            "signDate": {
              $gte: startDate,
              $lt: endDate,
            },
          },
        },
        {
          $project: {
            monthYear: {
              $dateToString: {
                format: "%m-%Y",
                date: "$signDate",
              },
            },
          },
        },
        {
          $group: {
            _id: "$monthYear",
            count: { $sum: 1 },
          },
        },
        {
          $sort: { "_id": 1 },
        },
      ]);

      res.json(result);
    }
  } catch (error) {
    next(error);
  }
});

// Route for sign up :
router.post('/datacharts/signup', auth, async (req, res, next) => {  
  try {
    const { year } = req.body;
    if (!year) {
      return res.status(400).json({ error: 'Year parameter is required.' });
    }

    const user = await userSchema.findOne({id: req.user.id});
    if (user.role === "admin"){
      const startDate = new Date(year, 0, 1);
      const endDate = new Date(year, 12, 1);

      const result = await DataCharts.aggregate([
        {
          $match: {
            "typeOfSign": "signup",
            "signDate": {
              $gte: startDate,
              $lt: endDate,
            },
          },
        },
        {
          $project: {
            monthYear: {
              $dateToString: {
                format: "%m-%Y",
                date: "$signDate",
              },
            },
          },
        },
        {
          $group: {
            _id: "$monthYear",
            count: { $sum: 1 },
          },
        },
        {
          $sort: { "_id": 1 },
        },
      ]);

      res.json(result);
    }
  } catch (error) {
    next(error);
  }
});

// Cards stats :
router.get('/cardsstats', auth, async (req, res, next) => {  
  try {
    const user = await userSchema.findOne({id: req.user.id});
    if (user.role === "admin"){
      const usersCard = await userSchema.find({role: "user"}).count();
      const collectionCard = await carSchema.find({}).count();
      const opinionsCard = await messageSchema.find({typeMsg: "opinion"}).count();
      const reportsCard = await messageSchema.find({typeMsg: "report"}).count();

      const cardsStats = { users: usersCard, collection: collectionCard, opinions: opinionsCard, reports: reportsCard };
      res.json(cardsStats);
    }
  } catch (error) {
    next(error);
  }
});


module.exports = router;