import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    users: [
        {
            username: 'santiago',
            name: 'santiago',
            lastname: 'sarmiento',
            password: '123456',
            phone: '3512845655',
            photo: '',
            status: 'Available',
            lastSeen: '5 minutes ago',
            id: 22
        }
    ]
}

export const usersSlice = createSlice({
    name: 'counter',
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
        resetUsers: (state) => {
            state.users = initialState.users
        }
    },
})

// Action creators are generated for each case reducer function
export const { editUser, resetUsers } = usersSlice.actions

export default usersSlice.reducer