import { createSlice } from '@reduxjs/toolkit'
import { EditorState } from 'draft-js'

import { urlsState } from '../../types/redux'

const initialState: urlsState = {
  createdURLId: null,
  currentUrlData: {
    title: null,
    content: EditorState.createEmpty(),
    hasPassword: false,
  },
}

const urlsSlice = createSlice({
  name: 'urls',
  initialState,
  reducers: {
    setCurrentUrlData(state, action) {
      state.currentUrlData = action.payload
    },
    setCreatedURLId(state, action) {
      state.createdURLId = action.payload
    },
  },
})

export const urlsActions = urlsSlice.actions
export const urlsReducer = urlsSlice.reducer
