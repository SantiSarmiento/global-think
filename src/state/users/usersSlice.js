import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    usuarios: [
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
            state.usuarios = action.payload.usuarios
        }
    },
})

// Action creators are generated for each case reducer function
export const { prueba } = usersSlice.actions

export default usersSlice.reducer