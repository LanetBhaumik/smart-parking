import baseService from "./baseService";

export const signInService = (Credentials) =>
  baseService.post("/users/login", Credentials);
export const signUpService = (userData) => baseService.post("/users", userData);

export const profileService = () => baseService.get("/users/me");

export default { signInService, signUpService, profileService };
