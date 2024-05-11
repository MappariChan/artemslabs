const { randomUUID } = require("crypto");

const driverService = require("../driver/driver.service");
const tripService = require("../trip/trip.service");

//Сервіс для сутності заявки на рейс

class TripRequestService {
  tripRequests = [];

  //Логіка для отримання даних про всі заявки на рейс
  getAll() {
    return this.tripRequests.map((tripRequest) => {
      const driver = driverService.getOne(tripRequest.driverId);
      const trip = tripService.getOne(tripRequest.tripId);
      return {
        ...tripRequest,
        driver,
        trip,
      };
    });
  }

  //Логіка для отримання даних про певну заявку на рейс
  getOne(tripRequestId) {
    const tripRequest = this.tripRequests.find(
      (tripRequest) => tripRequest.id === tripRequestId
    );
    if (!tripRequest) return null;
    const driver = driverService.getOne(tripRequest.driverId);
    const trip = tripService.getOne(tripRequest.tripId);
    return { ...tripRequest, driver, trip };
  }

  //Логіка для створення нової заявки на рейс
  create(tripRequest) {
    const tripRequestId = randomUUID();
    this.tripRequests.push({ id: tripRequestId, ...tripRequest });
    return this.getOne(tripRequestId);
  }

  //Логіка для видалення існуючої заявки на рейс
  delete(tripRequestId) {
    this.tripRequests = this.tripRequests.filter(
      (tripRequest) => tripRequest.id != tripRequestId
    );
  }

  //Логіка для оновлення даних існуючої заявки на рейс
  update(tripRequestId, updatedTripRequest) {
    this.tripRequests = this.tripRequests.map((tripRequest) =>
      tripRequest.id === tripRequestId
        ? { id: tripRequestId, ...updatedTripRequest }
        : tripRequest
    );
    return this.getOne(tripRequestId);
  }
}

const tripRequestService = new TripRequestService();

module.exports = tripRequestService;
