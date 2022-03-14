import baseService from "./baseService";

export const getParkings = () => {
  return baseService.get("/parkings");
};
export default { getParkings };
