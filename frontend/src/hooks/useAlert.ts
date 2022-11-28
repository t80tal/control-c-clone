import { useDispatch } from 'react-redux'

import { uiActions } from '../store/ui'

export const useAlert = () => {
  const dispatch = useDispatch()
  
  return (msg: string) => {
    dispatch(uiActions.setErrorModal(msg))
    setTimeout(() => {
      dispatch(uiActions.setErrorModal(null))
    }, 3000)
  }
}
