import baseService from "./baseService";

export function ownerLogin(Credentials){
    return baseService.post('/owners/login', Credentials)
}

export default {ownerLogin}