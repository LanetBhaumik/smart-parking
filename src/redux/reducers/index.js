import { combineReducers } from 'redux'
import auth from './userAuth.js';
import parkings from './parkings'

export default combineReducers({auth, parkings})