import baseService from "./baseService";

export const userProfileService = () => baseService.get("/users/me");

export const userBookingsService = (limit, skip) =>
  baseService.get(`/bookings/me?limit=${limit}&skip=${skip}`);

export const addCarService = (car) => baseService.post("/user/cars", car);

export default {
  userProfileService,
  userBookingsService,
  addCarService,
};
