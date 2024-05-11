const { randomUUID } = require("crypto");

const carService = require("../car/car.service");

//Сервіс для сутності водія

class DriverService {
  drivers = [];

  //Логіка для отримання всіх водіїв з їхнім автомобілем
  getAll() {
    return this.drivers.map((driver) => {
      const car = carService.getOne(driver.carId);
      return {
        ...driver,
        car,
      };
    });
  }

  //Логіка для отримання одного водія з його автомобілем
  getOne(driverId) {
    const driver = this.drivers.find((driver) => driver.id === driverId);
    if (!driver) return null;
    const car = carService.getOne(driver.carId);
    return { ...driver, car };
  }

  //Логіка для створення нового водія
  create(driver) {
    const driverId = randomUUID();
    this.drivers.push({ id: driverId, ...driver });
    return this.getOne(driverId);
  }

  //Логіка для видалення існуючого водія
  delete(driverId) {
    this.drivers = this.drivers.filter((driver) => driver.id != driverId);
  }

  //Логіка для оновлення даних існуючого водія
  update(driverId, updatedDriver) {
    this.drivers = this.drivers.map((driver) =>
      driver.id === driverId ? { id: driverId, ...updatedDriver } : driver
    );
    return this.getOne(driverId);
  }
}

const driverService = new DriverService();

module.exports = driverService;
