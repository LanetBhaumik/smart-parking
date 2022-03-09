const INITIAL_STATE = {
    token:"",
    role: "",
    error_msg: ""

}

export const LOGIN_SUCCESSFUL = "LOGIN_SUCCESSFUL";
export const INVALID_OWNER = "INVALID_OWNER"
export const LOGOUT = "LOGOUT"

export default (state = INITIAL_STATE, action)=>{
    switch (action.type) {
        case LOGIN_SUCCESSFUL:{
            return Object.assign({}, state,{token:action.data.token, role:"owner"})
        }
        case INVALID_OWNER:{
            return Object.assign({}, state,{error_msg:action.data.error_msg})
        }
        case LOGOUT:{
            return Object.assign({}, state,{token:"", role:""})
        }
    
        default:
            return state;
    }
}
