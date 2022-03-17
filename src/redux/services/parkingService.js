import baseService from "./baseService";

export const getParkingsService = () => {
  return baseService.get("/parkings");
};
export const parkingDetailService = (parkingId) => {
  return baseService.get(`/parkings/${parkingId}`);
};

export default { getParkingsService, parkingDetailService };
