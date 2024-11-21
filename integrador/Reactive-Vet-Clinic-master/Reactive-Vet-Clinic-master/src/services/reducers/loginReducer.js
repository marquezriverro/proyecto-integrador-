import {LOG_IN} from "../actions/actionTypes"

const inititalState = {
    login: false
}

export const loginReducer = (state = inititalState, action) => {
    if(action.type === LOG_IN){
            return {
                login: action.payload
            } 
        }
            return state
}