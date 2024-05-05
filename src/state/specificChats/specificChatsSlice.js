import { createSlice } from '@reduxjs/toolkit'

//en el estado inicial agregamos un registro de ultimo id para simular un autoincremental
const initialState = {
    specificChats: [
        {
            contact: "John",
            messages: [
                {
                    sender: "John",
                    content: "Hola como estas?",
                    time: "10:00 AM",
                    photo: ""
                },
                {
                    sender: "You",
                    content: "Bien, gracias, y tu?",
                    time: "10:05 AM",
                    photo: ""
                }
            ]
        },
        {
            contact: "Maria",
            messages: [
                {
                    sender: "Maria",
                    content: "Hacemos la reunion a las 3?",
                    time: "yesterday",
                    photo: ""
                },
                {
                    sender: "You",
                    content: "Si, nos vemos a las 3",
                    time: "yesterday",
                    photo: ""
                }
            ]
        },
        {
            contact: "Peter",
            messages: [
                {
                    sender: "You",
                    content: "Peter, llegas a tiempo?",
                    time: "yesterday",
                    photo: ""
                },
                {
                    sender: "Peter",
                    content: "Llego tarde a la reunion",
                    time: "yesterday",
                    photo: ""
                }
            ]
        },
        {
            contact: "Ana",
            messages: [
                {
                    sender: "Ana",
                    content: "Vamos a cenar?",
                    time: "yesterday",
                    photo: ""
                }
            ]
        },
        {
            contact: "Carlos",
            messages: [
                {
                    sender: "Carlos",
                    content: "Nos vemos en la oficina",
                    time: "yesterday",
                    photo: ""
                }
            ]
        },
        {
            contact: "Sara",
            messages: [
                {
                    sender: "Sara",
                    content: "Hoy no puedo ir al cine",
                    time: "yesterday",
                    photo: ""
                },
                {
                    sender: "You",
                    content: "Lo dejamos para otro dia?",
                    time: "yesterday",
                    photo: ""
                },
                {
                    sender: "Sara",
                    content: "Si, mejor otro dia",
                    time: "yesterday",
                    photo: ""
                },
            ]
        }
    ]
}

export const spicificChatsSlice = createSlice({
    name: 'spicificChats',
    initialState,
    reducers: {
        addMessage: (state, action) => {
            const { contact, message } = action.payload;
            const chat = state.specificChats.find(chat => chat.contact === contact);
            chat.messages.push(message);
        }
    },
})

// Action creators are generated for each case reducer function
export const { addMessage } = spicificChatsSlice.actions

export default spicificChatsSlice.reducer