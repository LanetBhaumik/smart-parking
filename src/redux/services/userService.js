import baseService from "./baseService";

export const userProfileService = () => baseService.get("/users/me");

export const userBookingsService = (limit, skip) =>
  baseService.get(`/bookings/me?limit=${limit}&skip=${skip}`);

export default {
  userProfileService,
  userBookingsService,
};
