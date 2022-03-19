import baseService from "./baseService";

export const newBookingService = (bookingData) => {
  return baseService.post("/bookings", bookingData);
};

export default { newBookingService };
