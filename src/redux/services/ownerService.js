import baseService from "./baseService";

export const ownerSignInService = (Credentials) => {
  return baseService.post("/owners/login", Credentials);
};

export default { ownerSignInService, ownerSignUpService };
