const addCar = async (req, res) => {
  try {
    const car = req.body.car.toUpperCase();
    if (req.user.cars.includes(car)) {
      return res.status(400).send({
        error: "car already created",
      });
    }
    const cars = [...req.user.cars, car];
    req.user.cars = cars;
    await req.user.save();
    res.status(201).send({
      cars: req.user.cars,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      error: error.message,
    });
  }
};

const makeCarPrimary = async (req, res) => {
  try {
    req.user.car_no = req.car;
    await req.user.save();
    res.send({
      success: `Now ${req.car} is your primary car`,
    });
  } catch (error) {
    console.log(error);
    res.send({
      error: error.message,
    });
  }
};

const deleteCar = async (req, res) => {
  try {
    const updatedCars = req.user.cars.filter((car) => {
      return car !== req.car;
    });
    if (req.car === req.user.car_no) {
      req.user.car_no = updatedCars[0];
    }
    req.user.cars = updatedCars;
    await req.user.save();
    res.send({
      success: `${req.car} is deleted successfully`,
      updatedCars,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      error: error.message,
    });
  }
};

module.exports = { addCar, makeCarPrimary, deleteCar };
