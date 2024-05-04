import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    users: [
        {
            name: 'Santiago',
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
        prueba: (state, action) => {
            state.users = action.payload.users
        },
        resetUsers: (state) => {
            state.users = initialState.users
        }
    },
})

// Action creators are generated for each case reducer function
export const { prueba, resetUsers } = usersSlice.actions

export default usersSlice.reducer