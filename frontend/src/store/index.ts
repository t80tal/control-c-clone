import { configureStore } from '@reduxjs/toolkit'

import { uiReducer } from './ui'
import { urlsReducer } from './urls'

const store = configureStore({
  reducer: {
    urls: urlsReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
})

export default store
