import { FC, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { TiArrowBackOutline, TiArrowForwardOutline } from 'react-icons/ti'
import { FaRegCopy, FaRegCheckCircle } from 'react-icons/fa'

import useAnimatedNavigate from '../hooks/useAnimatedNavigate'

import { ReduxState } from '../types/redux'

import Loading from '../components/Loading'

const CreatedSection: FC<{}> = () => {
  const urlId = useSelector((state: ReduxState) => state.urls.createdURLId)
  const animatedNavigate = useAnimatedNavigate()

  const url = `${window.location.origin}/${urlId}`

  useEffect(() => {
    if (!urlId) {
      animatedNavigate('/')
    }
  }, [urlId])

  return (
    <div className="created-section">
      {urlId ? 
        <>
          <div className="success">
            <FaRegCheckCircle className="icon" size={25} />
            Created Successfully
          </div>
          <div className="copy-input">
            <input onChange={() => {}} value={url} />
            <button
              onClick={() =>
                navigator.clipboard.writeText(url).then(() => alert('Copied successfully.'))
              }
            >
              <FaRegCopy className="icon" size={23} />
            </button>
          </div>
          <div className="buttons">
            <button onClick={() => animatedNavigate('/')}>
              <TiArrowBackOutline size={25} className="icon" />Go Back
            </button>
            <button onClick={() => animatedNavigate(`/${urlId}`)}>
              Open now<TiArrowForwardOutline size={25} className="icon" />
            </button>
          </div>
        </> : 
        <Loading className='loading'/> }
    </div>
  )
}

export default CreatedSection
