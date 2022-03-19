import baseService from "./baseService";

export const parkingBookingsService = (parkingId) => {
  return baseService.get(`/bookings/${parkingId}`);
};
export default { parkingBookingsService };
