import { LOG_IN, REGISTER_PET, REGISTER_USER } from "./actionTypes";

export const login = (result) =>{
    return{
        type: LOG_IN,
        payload: result.data
    }
}
export const registerUser = (result) =>{
    return{
        type: REGISTER_USER,
        payload: result.data
    }
}
export const registerPet = (result) =>{
    return{
        type: REGISTER_PET,
        payload: result.data
    }
}