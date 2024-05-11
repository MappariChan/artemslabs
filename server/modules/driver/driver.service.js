const { randomUUID } = require("crypto");

const carService = require("../car/car.service");

class DriverService {
  drivers = [];

  getAll() {
    return this.drivers.map((driver) => {
      const car = carService.getOne(driver.carId);
      return {
        ...driver,
        car,
      };
    });
  }

  getOne(driverId) {
    const driver = this.drivers.find((driver) => driver.id === driverId);
    if (!driver) return null;
    const car = carService.getOne(driver.carId);
    return { ...driver, car };
  }

  create(driver) {
    const driverId = randomUUID();
    this.drivers.push({ id: driverId, ...driver });
    return this.getOne(driverId);
  }

  delete(driverId) {
    this.drivers = this.drivers.filter((driver) => driver.id != driverId);
  }

  update(driverId, updatedDriver) {
    this.drivers = this.drivers.map((driver) =>
      driver.id === driverId ? { id: driverId, ...updatedDriver } : driver
    );
    return this.getOne(driverId);
  }
}

const driverService = new DriverService();

module.exports = driverService;
