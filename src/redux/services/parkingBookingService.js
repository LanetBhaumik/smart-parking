import baseService from "./baseService";

export const parkingBookingsService = (parkingId) => {
  return baseService.get(`/bookings/parking/${parkingId}`);
};
export const parkingSlotBookingsService = (parkingId, slot) => {
  return baseService.get(`/bookings/parking/${parkingId}/${slot}`);
};

export default { parkingBookingsService };
