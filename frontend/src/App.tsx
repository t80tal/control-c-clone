import { FC } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'

import Router from './components/Router'
import ErrorModal from './components/ErrorModal'

import { ReduxState } from './types/redux'

const App: FC<{}> = () => {
  const isContainerAnimating = useSelector((state: ReduxState) => state.ui.isContainerAnimating)
  axios.defaults.baseURL = process.env.REACT_APP_API

  return (
    <>
      <ErrorModal />
      <div className="logo"> Control C | Clone</div>
      <div className={`container ${isContainerAnimating ? 'animating' : ''}`}>
        <Router />
      </div>
    </>
  )
}

export default App
