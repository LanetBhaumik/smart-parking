import baseService from "./baseService";

export const userProfileService = () => baseService.get("/users/me");

export const userBookingsService = () => baseService.get("/bookings/me");

export default {
  userProfileService,
  userBookingsService,
};
