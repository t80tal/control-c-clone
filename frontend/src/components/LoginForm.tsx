import { FC, useState } from 'react'
import { FiAlertTriangle, FiLogIn } from 'react-icons/fi'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

import Input from './Input'
import HomeButton from './HomeButton'

import { useAlert } from '../hooks/useAlert'

import { getURLDataWithPassword } from '../store/urls/actions'

const LoginForm: FC<{}> = () => {
  const dispatch = useDispatch<any>()
  const toggleAlert = useAlert()
  const [password, setPassword] = useState<string>('')
  const { urlId } = useParams()

  const onLogin = () => {
    if(!password) {
      toggleAlert('Please provide password.')
      return
    }
    dispatch(getURLDataWithPassword({ password, id: urlId as string }, toggleAlert))
  }

  return (
    <>
      <div className="header">
        <h2>Insert a password</h2>
      </div>
      <Input
        value={password}
        onChange={(e: any) => setPassword(e.target.value)}
        label="password:"
        type="password"
      />
      <div className="warning">
        <FiAlertTriangle size={45} className="icon" />
        <p>
          Note that our system monitors your IP address <br />
          and logs it in LOGS files to avoid <br />
          hacking and keep everyone safe.
          <br />
          With too many requests you will be blocked.
          <br />
        </p>
      </div>
      <div className="buttons">
        <HomeButton />
        <button onClick={onLogin}>
          Submit
          <FiLogIn size={25} className="icon" />
        </button>
      </div>
    </>
  )
}

export default LoginForm
