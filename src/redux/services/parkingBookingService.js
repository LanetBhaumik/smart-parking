import baseService from "./baseService";

export const parkingBookingsService = (parkingId) => {
  return baseService.get(`/bookings/${parkingId}`);
};
export const parkingSlotBookingsService = (parkingId, slot) => {
  return baseService.get(`/bookings/${parkingId}/${slot}`);
};

export default { parkingBookingsService };
