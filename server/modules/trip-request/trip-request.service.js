const { randomUUID } = require("crypto");

const driverService = require("../driver/driver.service");
const tripService = require("../trip/trip.service");

class TripRequestService {
  tripRequests = [];

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

  getOne(tripRequestId) {
    const tripRequest = this.tripRequests.find(
      (tripRequest) => tripRequest.id === tripRequestId
    );
    if (!tripRequest) return null;
    const driver = driverService.getOne(tripRequest.driverId);
    const trip = tripService.getOne(tripRequest.tripId);
    return { ...tripRequest, driver, trip };
  }

  create(tripRequest) {
    const tripRequestId = randomUUID();
    this.tripRequests.push({ id: tripRequestId, ...tripRequest });
    return this.getOne(tripRequestId);
  }

  delete(tripRequestId) {
    this.tripRequests = this.tripRequests.filter(
      (tripRequest) => tripRequest.id != tripRequestId
    );
  }

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
