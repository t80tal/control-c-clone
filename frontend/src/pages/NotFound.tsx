import { FC } from 'react'
import { useLocation } from 'react-router-dom'

import HomeButton from '../components/HomeButton'
import useAnimatedNavigate from '../hooks/useAnimatedNavigate'

const NotFound: FC<{}> = () => {
  const { state } = useLocation()
  const animatedNavigate = useAnimatedNavigate()

  !state?.cameFromViewPage && animatedNavigate('/')

  return (
    <div className="not-found">
      <img src="/not-found.svg" alt="Illustration with 404." />
      <p>The requested url is not found.</p>
      <HomeButton />
    </div>
  )
}

export default NotFound
