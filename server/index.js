const express = require("express");

const tripRouter = require("./modules/trip/trip.router");
const driverRouter = require("./modules/driver/driver.router");
const carRouter = require("./modules/car/car.router");
const tripRequestRouter = require("./modules/trip-request/trip-request.router");

const app = express();

app.use(express.json());

app.use("/trips", tripRouter);
app.use("/drivers", driverRouter);
app.use("/cars", carRouter);
app.use("/trip-requests", tripRequestRouter);

app.listen(3000, () => {
  console.log("started");
});
