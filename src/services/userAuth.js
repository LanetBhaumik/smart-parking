import baseService from "./baseService";

export function login(Credentials){
    return baseService.post('/users/login', Credentials)
}
