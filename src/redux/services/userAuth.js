import baseService from "./baseService";

export const userLogIn = (Credentials)=>baseService.post('/users/login', Credentials)
export const userSignUp = (userData) => baseService.post('/users',userData)

export default {userLogIn, userSignUp}