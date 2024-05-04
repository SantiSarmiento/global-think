import { combineReducers } from 'redux';
import profileSlice from './profile/profileSlice';
import usersSlice from './users/usersSlice';

export default combineReducers({
    profile: profileSlice,
    users: usersSlice
});
