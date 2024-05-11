const { Router } = require("express");

const tripService = require("./trip.service");

const tripRouter = Router();

tripRouter.get("/", (req, res) => {
  const trips = tripService.getAll();
  return res.send(trips);
});

tripRouter.get("/:tripId", (req, res) => {
  const trip = tripService.getOne(req.params.tripId);
  if (trip) return res.send(trip);
  return res.status(404).send();
});

tripRouter.post("/", (req, res) => {
  const trip = tripService.create(req.body);
  if (!trip) return res.status(400).send();
  return res.send(trip);
});

tripRouter.put("/:tripId", (req, res) => {
  const updatedTrip = tripService.update(req.params.tripId, req.body);
  if (updatedTrip) return res.send(updatedTrip);
  return res.status(404).send();
});

tripRouter.delete("/:tripId", (req, res) => {
  const tripToDelete = tripService.getOne(req.params.tripId);
  if (!tripToDelete) return res.status(404).send();
  tripService.delete(req.params.tripId);
  return res.status(204).send();
});

module.exports = tripRouter;
