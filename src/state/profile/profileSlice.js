import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  name: '',
  phone: '',
  photo: '',
  status: '',
  lastSeen: ''
}

export const profileSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    prueba: (state, action) => {
      state.name = action.payload.name
    }
  },
})

// Action creators are generated for each case reducer function
export const { prueba } = profileSlice.actions

export default profileSlice.reducer