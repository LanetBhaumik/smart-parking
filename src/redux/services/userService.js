import baseService from "./baseService";

export const profileService = () => baseService.get("/users/me");

export const userBookingsService = () => baseService.get("/bookings/me");

export default {
  profileService,
  userBookingsService,
};
