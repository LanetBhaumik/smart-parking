import baseService from "./baseService";

export function userLogin(Credentials){
    return baseService.post('/users/login', Credentials)
}

export default {userLogin}