import { createSlice } from '@reduxjs/toolkit'

//en el estado inicial agregamos un registro de ultimo id para simular un autoincremental
const initialState = {
    chats: [
        {
            id: 1,
            contact: "John",
            lastMessage: "Hola como estas?",
            lastMessageTime: "10:00 AM"
        },
        {
            id: 2,
            contact: "Maria",
            lastMessage: "Hacemos la reunion a las 3?",
            lastMessageTime: "ayer"
        },
        {
            id: 3,
            contact: "Peter",
            lastMessage: "Llego tarde a la reunion",
            lastMessageTime: "Hace 2 horas"
        }

    ],
    lastId: 1
}

export const chatsSlice = createSlice({
    name: 'chats',
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.users.push(action.payload)
        },
        resetUsers: (state) => {
            state.users = initialState.users
        }
    },
})

// Action creators are generated for each case reducer function
export const { editUser, addUser, resetUsers } = chatsSlice.actions

export default chatsSlice.reducer