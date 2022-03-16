import baseService from "./baseService";

export const ownerProfileService = () => baseService.get("/owners/me");
export const addParkingService = (parkingData) =>
  baseService.post("/owners/parkings", parkingData);

export default { ownerProfileService, addParkingService };
