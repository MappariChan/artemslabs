const { Router } = require("express");

const driverService = require("./driver.service");

const driverRouter = Router();

driverRouter.get("/", (req, res) => {
  const drivers = driverService.getAll();
  return res.send(drivers);
});

driverRouter.get("/:driverId", (req, res) => {
  const driver = driverService.getOne(req.params.driverId);
  if (driver) return res.send(driver);
  return res.status(404).send();
});

driverRouter.post("/", (req, res) => {
  const driver = driverService.create(req.body);
  if (!driver) return res.status(400).send();
  return res.send(driver);
});

driverRouter.put("/:driverId", (req, res) => {
  const updatedDriver = driverService.update(req.params.driverId, req.body);
  if (updatedDriver) return res.send(updatedDriver);
  return res.status(404).send();
});

driverRouter.delete("/:driverId", (req, res) => {
  const driverToDelete = driverService.getOne(req.params.driverId);
  if (!driverToDelete) return res.status(404).send();
  driverService.delete(req.params.driverId);
  return res.status(204).send();
});

module.exports = driverRouter;
