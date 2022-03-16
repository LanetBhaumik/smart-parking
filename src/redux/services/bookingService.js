import baseService from "./baseService";

export const newBookingService = (bookingData) => {
  return baseService.post("/bookings", bookingData);
};

export const parkingBookingsService = (parkingId) => {
  return baseService.get(`/bookings/${parkingId}`);
};
export default { newBookingService, parkingBookingsService };
