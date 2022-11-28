import { convertToRaw, EditorState } from 'draft-js'
import { FC, ChangeEventHandler, useState } from 'react'
import { Editor } from 'react-draft-wysiwyg'
import { useSelector, useDispatch } from 'react-redux'
import { IoIosCreate } from 'react-icons/io'

import { CreateFormValues } from '../types/form'
import { ReduxState } from '../types/redux'

import Input from '../components/Input'
import Loading from '../components/Loading'

import { createURL } from '../store/urls/actions'

import useAnimatedNavigate from '../hooks/useAnimatedNavigate'
import { useAlert } from '../hooks/useAlert'


const CreateForm: FC<{}> = () => {
  const isLoading = useSelector((state: ReduxState) => state.ui.isLoading)
  const animatedNavigate = useAnimatedNavigate()
  const dispatch = useDispatch<any>()
  const toggleAlert = useAlert()
  const [values, setValues] = useState<CreateFormValues>({
    title: '',
    password: '',
    editor: EditorState.createEmpty()
  })

  const submitHandler = async (e: any) => {
    e.preventDefault()
    const rawEditorContent = convertToRaw(values.editor.getCurrentContent())
    if (!values.title || !values.editor || !rawEditorContent.blocks[0].text) {
      toggleAlert('Please provide title and text.')
      return
    }
    
    dispatch(
      createURL({
        title: values.title,
        password: values.password,
        content: rawEditorContent,
      }, toggleAlert)
    ).then(() => animatedNavigate('/success'))
  }

  const onChangeValueHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target) {
      setValues((prevState: any) => ({ ...prevState, [e.target?.name]: e.target.value }))
    } else {
      setValues((prevState: any) => ({ ...prevState, editor: e }))
    }
  }

  return (
    <form onSubmit={submitHandler}>
      <div className="header">
        <Input
          label="Title:"
          value={values.title}
          name="title"
          onChange={onChangeValueHandler}
        />
        <Input
          label="Password to view?"
          value={values.password}
          name="password"
          type="password"
          onChange={onChangeValueHandler}
        />
      </div>
      <div className="main">
        <Editor
          editorState={values.editor}
          toolbarClassName="tools-bar"
          wrapperClassName="text-container"
          editorClassName="text-editor"
          onEditorStateChange={onChangeValueHandler as any}
        />
      </div>
      <div className="footer">
        {isLoading ? <Loading /> : 
        <button type="submit">
            <IoIosCreate className="icon" size={25} />
        </button>}
      </div>
    </form>
  )
}

export default CreateForm
