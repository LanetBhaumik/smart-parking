import baseService from "./baseService";

export const ownerProfileService = () => baseService.get("/owners/me");

export default { ownerProfileService };
