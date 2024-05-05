import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  username: '',
  name: '',
  lastname: '',
  phone: '',
  photo: '',
  status: '',
  lastSeen: '',
  id: null
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.username = action.payload.username
      state.name = action.payload.name
      state.lastname = action.payload.lastname
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