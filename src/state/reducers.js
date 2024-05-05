import { combineReducers } from 'redux';
import profileSlice from './profile/profileSlice';
import usersSlice from './users/usersSlice';
import chatsSlice from './chats/chatsSlice';
import spicificChatsSlice from './specificChats/specificChatsSlice';

export default combineReducers({
    profile: profileSlice,
    users: usersSlice,
    chats: chatsSlice,
    chat: spicificChatsSlice
});
