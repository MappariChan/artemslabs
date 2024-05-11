const { randomUUID } = require("crypto");

class CarService {
  cars = [];

  getAll() {
    return this.cars;
  }

  getOne(carId) {
    return this.cars.find((car) => car.id === carId);
  }

  create(car) {
    const carId = randomUUID();
    this.cars.push({ id: carId, ...car });
    return this.getOne(carId);
  }

  delete(carId) {
    this.cars = this.cars.filter((car) => car.id != carId);
  }

  update(carId, updatedCar) {
    this.cars = this.cars.map((car) =>
      car.id === carId ? { id: carId, ...updatedCar } : car
    );
    return this.getOne(carId);
  }
}

const carService = new CarService();

module.exports = carService;
