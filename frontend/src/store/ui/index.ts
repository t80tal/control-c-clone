import { createSlice } from '@reduxjs/toolkit'

import { uiState } from '../../types/redux'

const initialState: uiState = {
  isLoading: false,
  isContainerAnimating: false,
  errorModal: null,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setIsLoading(state, action) {
      state.isLoading = action.payload
    },
    setIsContainerAnimating(state, action) {
      state.isContainerAnimating = action.payload
    },
    setErrorModal(state, action) {
      state.errorModal = action.payload
    },
  },
})

export const uiActions = uiSlice.actions
export const uiReducer = uiSlice.reducer
