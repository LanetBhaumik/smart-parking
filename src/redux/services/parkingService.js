import baseService from "./baseService";

export const getParkingsService = (limit = 10, skip = 0) => {
  return baseService.get(`/parkings?limit=${limit}&skip=${skip}`);
};
export const parkingDetailService = (parkingId) => {
  return baseService.get(`/parkings/${parkingId}`);
};

export default { getParkingsService, parkingDetailService };
