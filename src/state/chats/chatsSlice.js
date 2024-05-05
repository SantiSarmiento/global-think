import { createSlice } from '@reduxjs/toolkit'

//en el estado inicial agregamos un registro de ultimo id para simular un autoincremental
const initialState = {
    chats: [
        {
            id: 1,
            contact: "John",
            lastMessage: "Hola como estas?",
            lastMessageTime: "10:00 AM",
            pinup: false,
            archived: false
        },
        {
            id: 2,
            contact: "Maria",
            lastMessage: "Hacemos la reunion a las 3?",
            lastMessageTime: "ayer",
            pinup: false,
            archived: false
        },
        {
            id: 3,
            contact: "Peter",
            lastMessage: "Llego tarde a la reunion",
            lastMessageTime: "Hace 2 horas",
            pinup: false,
            archived: false
        },
        {
            id: 4,
            contact: "Ana",
            lastMessage: "Vamos a cenar?",
            lastMessageTime: "Hace 5 minutos",
            pinup: false,
            archived: false
        },
        {
            id: 5,
            contact: "Carlos",
            lastMessage: "Nos vemos en la oficina",
            lastMessageTime: "Hace 10 minutos",
            pinup: false,
            archived: false
        },
        {
            id: 6,
            contact: "Sara",
            lastMessage: "Hoy no puedo ir al cine",
            lastMessageTime: "Hace 1 hora",
            pinup: false,
            archived: false
        }
    ],
    lastId: 6
}

export const chatsSlice = createSlice({
    name: 'chats',
    initialState,
    reducers: {
        pinChat: (state, action) => {
            state.chats = state.chats.map(chat => chat.id === action.payload ? { ...chat, pinup: !chat.pinup } : chat)
        },
        archiveChat: (state, action) => {
            state.chats = state.chats.map(chat => chat.id === action.payload ? { ...chat, archived: !chat.archived, pinup: false } : chat)
        }
    },
})

// Action creators are generated for each case reducer function
export const { pinChat, archiveChat } = chatsSlice.actions

export default chatsSlice.reducer