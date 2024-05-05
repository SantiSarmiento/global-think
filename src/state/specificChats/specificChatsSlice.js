import { createSlice } from '@reduxjs/toolkit'

//en el estado inicial agregamos un registro de ultimo id para simular un autoincremental
const initialState = {
    specificChats: [
        {
            contact: "John",
            messages: [

                {
                    sender: "You",
                    content: "Hola, como estas?",
                    time: "10:05 AM",
                    photo: ""
                },
                {
                    sender: "John",
                    content: "Bien, gracias",
                    time: "11:00 AM",
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
                    time: "ayer",
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
                    time: "ayer",
                    photo: ""
                },
                {
                    sender: "Peter",
                    content: "Llego tarde a la reunion",
                    time: "ayer",
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
                    time: "ayer",
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
                    time: "ayer",
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
                    time: "ayer",
                    photo: ""
                },
                {
                    sender: "You",
                    content: "Lo dejamos para otro dia?",
                    time: "ayer",
                    photo: ""
                },
                {
                    sender: "Sara",
                    content: "Si, mejor otro dia",
                    time: "ayer",
                    photo: ""
                },
                {
                    sender: "You",
                    content: "Podriamos dejarlo para el Sabado?",
                    time: "ayer",
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