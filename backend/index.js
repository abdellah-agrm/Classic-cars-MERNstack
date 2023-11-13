const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const createError = require("http-errors");
const dotenv = require("dotenv");
const path = require("path"); // Import the 'path' module

dotenv.config();

const carRoute = require("./Cars-app/Routes/car.routes");
const userRoute = require("./User-app/Routes/user.routes");
const adminUser = require("./Admin-app/Routes/admin.routes");
const favoriteRoute = require("./Favorites/Routes/favorite.routes");
const messageRoute = require("./Message-app/Routes/message.routes"); 

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Connected to MongoDB`);
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());

app.use("/cars", carRoute);
app.use("/user", userRoute);
app.use("/admin", adminUser);
app.use("/favorite", favoriteRoute);
app.use("/message", messageRoute);

// Serve static files from the 'uploads' directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const port = process.env.PORT || 4000;

const server = app.listen(port, () => {
  console.log("Server is running on port " + port);
});

app.use((req, res, next) => {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
