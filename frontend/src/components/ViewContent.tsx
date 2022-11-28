import { FC } from 'react'
import { useSelector } from 'react-redux'

import DisabledEditor from './DisabledEditor'
import HomeButton from './HomeButton'
import LoginForm from './LoginForm'

import { ReduxState } from '../types/redux'

const ViewContent: FC<{}> = () => {
  const { title, content, hasPassword } = useSelector((state: ReduxState) => state.urls.currentUrlData)

  return (
    <>
      {hasPassword ? <LoginForm /> : 
      <>
        <div className='header'>
          <h2>{title}</h2>
        </div>
        <DisabledEditor content={content} />
        <HomeButton />
      </> 
      }
    </>
  )
}

export default ViewContent
