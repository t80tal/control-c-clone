export interface RawUrl {
  title: string
  content: Draft.DraftModel.Encoding.RawDraftContentState
  password?: string
}

export interface urlCredentials {
  password: string
  id: string
}
