import { EditorState } from 'draft-js'
import { FC } from 'react'
import { Editor } from 'react-draft-wysiwyg'

interface props {
  content: EditorState
}

const DisabledEditor: FC<props> = ({ content }) => {
  return (
    <Editor
      editorState={content}
      toolbarClassName='view-toolbar'
      wrapperClassName='view-content-box'
      editorClassName='editor-box'
    />
  )
}

export default DisabledEditor
