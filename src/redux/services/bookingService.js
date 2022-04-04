import baseService from "./baseService";

export const newBookingService = (bookingData) => {
  return baseService.post("/bookings", bookingData);
};

export const deleteBookingService = (bookingId) => {
  return baseService.delete(`/bookings/${bookingId}`);
};
