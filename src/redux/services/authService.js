import baseService from "./baseService";

export const userSignInService = (Credentials) => {
  return baseService.post("/users/login", Credentials);
};

export const ownerSignInService = (Credentials) =>
  baseService.post("/owners/login", Credentials);

export const userSignUpService = (userData) =>
  baseService.post("/users", userData);

export const ownerSignUpService = (ownerData) => {
  return baseService.post("/owners", ownerData);
};

export const getProfileService = () => {
  return baseService.get("/profile");
};

export default {
  userSignInService,
  ownerSignInService,
  userSignUpService,
  ownerSignUpService,
  getProfileService,
};
