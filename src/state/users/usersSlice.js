import { createSlice } from '@reduxjs/toolkit'

//en el estado inicial agregamos un registro de ultimo id para simular un autoincremental
const initialState = {
    users: [
        {
            username: 'santiago',
            name: 'santiago',
            lastname: 'sarmiento',
            password: '1234',
            phone: '3512845655',
            photo: '',
            status: 'Disponible',
            lastSeen: 'Hace 5 minutos',
            id: 1
        }
    ],
    lastId: 1
}

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        editUser: (state, action) => {
            state.users = state.users.map(user => {
                if (user.id === action.payload.id) {
                    return {
                        ...user,
                        username: action.payload.username,
                        name: action.payload.name,
                        lastname: action.payload.lastname,
                        phone: action.payload.phone,
                        photo: action.payload.photo,
                        status: action.payload.status,
                        lastSeen: action.payload.lastSeen
                    }
                }
                return user
            })
        },
        addUser: (state, action) => {
            state.users.push(action.payload)
        },
        resetUsers: (state) => {
            state.users = initialState.users
        }
    },
})

// Action creators are generated for each case reducer function
export const { editUser, addUser, resetUsers } = usersSlice.actions

export default usersSlice.reducer