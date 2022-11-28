import { FC } from 'react'
import { TiArrowBackOutline } from 'react-icons/ti'

import useAnimatedNavigate from '../hooks/useAnimatedNavigate'

const HomeButton: FC<{}> = () => {
  const animatedNavigate = useAnimatedNavigate()

  return (
    <button onClick={() => animatedNavigate('/')}>
      Go Home <TiArrowBackOutline size={25} className='icon' />
    </button>
  )
}

export default HomeButton
