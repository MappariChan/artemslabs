const { Router } = require("express");

const carService = require("./car.service");

const carRouter = Router();

carRouter.get("/", (req, res) => {
  const cars = carService.getAll();
  return res.send(cars);
});

carRouter.get("/:carId", (req, res) => {
  const car = carService.getOne(req.params.carId);
  if (car) return res.send(car);
  return res.status(404).send();
});

carRouter.post("/", (req, res) => {
  const car = carService.create(req.body);
  if (!car) return res.status(400).send();
  return res.send(car);
});

carRouter.put("/:carId", (req, res) => {
  const updatedCar = carService.update(req.params.carId, req.body);
  if (updatedCar) return res.send(updatedCar);
  return res.status(404).send();
});

carRouter.delete("/:carId", (req, res) => {
  const carToDelete = carService.getOne(req.params.carId);
  if (!carToDelete) return res.status(404).send();
  carService.delete(req.params.carId);
  return res.status(204).send();
});

module.exports = carRouter;
