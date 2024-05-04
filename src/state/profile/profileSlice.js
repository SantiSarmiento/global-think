import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  name: '',
  phone: '',
  photo: '',
  status: '',
  lastSeen: '',
  id: null
}

export const profileSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    prueba: (state, action) => {
      state.name = action.payload.name
    },
    resetProfile: (state) => {
      state.name = ''
      state.phone = ''
      state.photo = ''
      state.status = ''
      state.lastSeen = ''
      state.id = null
    }
  },
})

// Action creators are generated for each case reducer function
export const { prueba, resetProfile } = profileSlice.actions

export default profileSlice.reducer