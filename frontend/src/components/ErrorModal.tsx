import { FC } from 'react'
import { BiErrorAlt } from 'react-icons/bi'
import { MdClose } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'

import { uiActions } from '../store/ui'

import { ReduxState } from '../types/redux'

const ErrorModal: FC<{}> = () => {
  const error = useSelector((state: ReduxState) => state.ui.errorModal)
  const dispatch = useDispatch()

  const resetError = () =>  dispatch(uiActions.setErrorModal(null))
  
  return (
    <div className={`error-modal ${error ? 'active' : ''}`}>
      <BiErrorAlt size={28} className='error-icon' />
      <span>{error}</span>
      <MdClose onClick={resetError} size={28} className='error-icon' />
    </div>
  )
}

export default ErrorModal
