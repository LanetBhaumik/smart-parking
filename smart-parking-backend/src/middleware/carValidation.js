const carValidation = async (req, res, next) => {
  try {
    const car = req.body.car.toUpperCase();
    const carRegex = /[A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{4}/;
    if (!carRegex.test(car)) {
      throw new Error(`${car} is not valid car no.`);
    }
    if (!req.user.cars.includes(car)) {
      throw new Error(`you don't own ${car} car.`);
    }
    req.car = car;
    next();
  } catch (error) {
    res.status(400).send({
      error: error.message,
    });
  }
};

module.exports = carValidation;
