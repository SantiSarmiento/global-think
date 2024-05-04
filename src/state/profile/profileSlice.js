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
    setProfile: (state, action) => {
      state.name = action.payload.name
      state.phone = action.payload.phone
      state.photo = action.payload.photo
      state.status = action.payload.status
      state.lastSeen = action.payload.lastSeen
      state.id = action.payload.id
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
export const { setProfile, resetProfile } = profileSlice.actions

export default profileSlice.reducer