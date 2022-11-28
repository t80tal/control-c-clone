import { FC, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

import Loading from '../components/Loading'
import ViewContent from '../components/ViewContent'

import useAnimatedNavigate from '../hooks/useAnimatedNavigate'
import { useAlert } from '../hooks/useAlert'

import { getURLData } from '../store/urls/actions'

const View: FC<{}> = () => {
  const [didLoadData, setDidLoadData] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)
  const animatedNavigate = useAnimatedNavigate()
  const dispatch = useDispatch<any>()
  const toggleAlert = useAlert()
  const { urlId } = useParams()

  if (!didLoadData) {
    dispatch(getURLData(urlId as string, (error) =>  {
      setIsError(true)
      if(error === 'Network Error') {
        toggleAlert(error)
        animatedNavigate('/')
      }
      else animatedNavigate('/not-found', { state: { cameFromViewPage: true } })
    })).then(() => setDidLoadData(true))
  }

  return (
    <div className="view-section">
      {!didLoadData || isError ? <Loading className="loading" /> : <ViewContent />}
    </div>
  )
}

export default View
