import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { uiActions } from '../store/ui'

const useAnimatedNavigate = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  return (path: string, options?: object) => {
    dispatch(uiActions.setIsContainerAnimating(true))
    setTimeout(() => {
      navigate(path, options || {})
    }, 500)
  }
}

export default useAnimatedNavigate
