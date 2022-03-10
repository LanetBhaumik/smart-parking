import baseService from "./baseService";

export function ownerSignIn(Credentials) {
  return baseService.post("/owners/login", Credentials);
}

export default { ownerSignIn };
