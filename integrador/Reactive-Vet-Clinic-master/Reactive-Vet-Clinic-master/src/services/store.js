import { createStore } from  'redux';
import { REGISTER, LOG_IN } from './actions/actionTypes';
import { mainReducer } from './reducers/mainReducer'

export default createStore(mainReducer);