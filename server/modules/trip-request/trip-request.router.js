const { Router } = require("express");

const tripRequestService = require("./trip-request.service");

const tripRequestRouter = Router();

tripRequestRouter.get("/", (req, res) => {
  const tripRequests = tripRequestService.getAll();
  return res.send(tripRequests);
});

tripRequestRouter.get("/:tripRequestId", (req, res) => {
  const tripRequest = tripRequestService.getOne(req.params.tripRequestId);
  if (tripRequest) return res.send(tripRequest);
  return res.status(404).send();
});

tripRequestRouter.post("/", (req, res) => {
  const tripRequest = tripRequestService.create(req.body);
  if (!tripRequest) return res.status(400).send();
  return res.send(tripRequest);
});

tripRequestRouter.put("/:tripRequestId", (req, res) => {
  const updatedTripRequest = tripRequestService.update(
    req.params.tripRequestId,
    req.body
  );
  if (updatedTripRequest) return res.send(updatedTripRequest);
  return res.status(404).send();
});

tripRequestRouter.delete("/:tripRequestId", (req, res) => {
  const tripRequestToDelete = tripRequestService.getOne(
    req.params.tripRequestId
  );
  if (!tripRequestToDelete) return res.status(404).send();
  tripRequestService.delete(req.params.tripRequestId);
  return res.status(204).send();
});

module.exports = tripRequestRouter;
