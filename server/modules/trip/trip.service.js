const { randomUUID } = require("crypto");

class TripService {
  trips = [];

  getAll() {
    return this.trips;
  }

  getOne(tripId) {
    return this.trips.find((trip) => trip.id === tripId);
  }

  create(trip) {
    const tripId = randomUUID();
    this.trips.push({ id: tripId, ...trip });
    return this.getOne(tripId);
  }

  delete(tripId) {
    this.trips = this.trips.filter((trip) => trip.id != tripId);
  }

  update(tripId, updatedTrip) {
    this.trips = this.trips.map((trip) =>
      trip.id === tripId ? { id: tripId, ...updatedTrip } : trip
    );
    return this.getOne(tripId);
  }
}

const tripService = new TripService();

module.exports = tripService;
