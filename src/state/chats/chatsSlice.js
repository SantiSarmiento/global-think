import { createSlice } from '@reduxjs/toolkit'

//en el estado inicial agregamos un registro de ultimo id para simular un autoincremental
const initialState = {
    chats: [
        {
            id: 1,
            contact: "John",
            sender: "John",
            lastMessage: "Bien, gracias",
            lastMessageTime: "10:00 AM",
            pinup: false,
            archived: false,
            lastSeen: "10:05 AM",
            photo: false,
        },
        {
            id: 2,
            contact: "Maria",
            sender: "Maria",
            lastMessage: "Hacemos la reunion a las 3?",
            lastMessageTime: "ayer",
            pinup: false,
            archived: false,
            lastSeen: "ayer",
            photo: false
        },
        {
            id: 3,
            contact: "Peter",
            sender: "Peter",
            lastMessage: "Llego tarde a la reunion",
            lastMessageTime: "Hace 2 horas",
            pinup: false,
            archived: false,
            lastSeen: "ayer",
            photo: false
        },
        {
            id: 4,
            contact: "Ana",
            sender: "Ana",
            lastMessage: "Vamos a cenar?",
            lastMessageTime: "Hace 5 minutos",
            pinup: false,
            archived: false,
            lastSeen: "En línea",
            photo: false
        },
        {
            id: 5,
            contact: "Carlos",
            sender: "Carlos",
            lastMessage: "Nos vemos en la oficina",
            lastMessageTime: "Hace 10 minutos",
            pinup: false,
            archived: true,
            lastSeen: "Hace 1 hora",
            photo: false
        },
        {
            id: 6,
            contact: "Sara",
            sender: "You",
            lastMessage: "Podriamos dejarlo para el Sabado?",
            lastMessageTime: "ayer",
            pinup: true,
            archived: false,
            lastSeen: "Hace 2 horas",
            photo: false
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
        },
        updateChat: (state, action) => {
            state.chats = state.chats.map(chat => chat.contact === action.payload.contact ? { ...chat, lastMessage: action.payload.message.content, photo: action.payload.message.photo, lastMessageTime: action.payload.message.time, sender: action.payload.message.sender } : chat)
        }
    },
})

// Action creators are generated for each case reducer function
export const { pinChat, archiveChat, updateChat } = chatsSlice.actions

export default chatsSlice.reducer