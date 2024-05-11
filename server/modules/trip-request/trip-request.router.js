const { Router } = require("express");

const tripRequestService = require("./trip-request.service");

const tripRequestRouter = Router();

//Хендлер запиту на отримання всіх заявок на рейс
tripRequestRouter.get("/", (req, res) => {
  const tripRequests = tripRequestService.getAll();
  return res.send(tripRequests);
});

//Хендлер запиту на отримання певної заявки на рейс
tripRequestRouter.get("/:tripRequestId", (req, res) => {
  const tripRequest = tripRequestService.getOne(req.params.tripRequestId);
  if (tripRequest) return res.send(tripRequest);
  return res.status(404).send();
});

//Хендлер запиту на створення нової заявки на рейс
tripRequestRouter.post("/", (req, res) => {
  const tripRequest = tripRequestService.create(req.body);
  if (!tripRequest) return res.status(400).send();
  return res.send(tripRequest);
});

//Хендлер запиту на оновлення даних існуючої заявки на рейс
tripRequestRouter.put("/:tripRequestId", (req, res) => {
  const updatedTripRequest = tripRequestService.update(
    req.params.tripRequestId,
    req.body
  );
  if (updatedTripRequest) return res.send(updatedTripRequest);
  return res.status(404).send();
});

//Хендлер запиту на видалення існуючої заявки на рейс
tripRequestRouter.delete("/:tripRequestId", (req, res) => {
  const tripRequestToDelete = tripRequestService.getOne(
    req.params.tripRequestId
  );
  if (!tripRequestToDelete) return res.status(404).send();
  tripRequestService.delete(req.params.tripRequestId);
  return res.status(204).send();
});

module.exports = tripRequestRouter;
