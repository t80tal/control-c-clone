import { FC, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Routes, useLocation } from 'react-router-dom'

import { uiActions } from '../store/ui'

import Succeed from '../pages/Succeed'
import Create from '../pages/Create'
import View from '../pages/View'
import NotFound from '../pages/NotFound'

const Router: FC<{}> = () => {
  const location = useLocation()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(uiActions.setIsContainerAnimating(false))
  }, [location.pathname])

  return (
    <Routes>
      <Route path='/' element={<Create />} />
      <Route path='/success' element={<Succeed />} />
      <Route path='/not-found' element={<NotFound />} />
      <Route path='/:urlId' element={<View />} />
    </Routes>
  )
}

export default Router
