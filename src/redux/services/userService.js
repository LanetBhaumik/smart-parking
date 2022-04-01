import baseService from "./baseService";

export const userProfileService = () => baseService.get("/users/me");

export const userBookingsService = (limit, skip) =>
  baseService.get(`/bookings/user/me?limit=${limit}&skip=${skip}`);

export const addCarService = (car) => baseService.post("/user/cars", car);

export const deleteCarService = (carId) =>
  baseService.delete(`/user/cars/${carId}`);

export const primaryCarService = (carId) =>
  baseService.post(`/user/primary_car/${carId}`);

export default {
  userProfileService,
  userBookingsService,
  addCarService,
  deleteCarService,
  primaryCarService,
};
