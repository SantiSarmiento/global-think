import { combineReducers } from 'redux';
import profileSlice from './profile/profileSlice';

export default combineReducers({
    profile: profileSlice
});
