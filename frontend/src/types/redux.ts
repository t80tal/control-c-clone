import { EditorState } from 'draft-js'

export interface ReduxState {
  ui: uiState
  urls: urlsState
}

export interface urlsState {
  createdURLId: string | null
  currentUrlData: {
    title: string | null
    content: EditorState
    hasPassword: boolean
  }
}

export interface uiState {
  isLoading: boolean
  isContainerAnimating: boolean
  errorModal: string | null
}
