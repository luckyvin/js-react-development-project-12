import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { selectToken } from '../slices/AuthSlice.js'

const MainPage = () => {
  const token = useSelector(selectToken)
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) {
      navigate('/login')
    }
  }, [token, navigate]);

  return <div>Main page</div>
}

export default MainPage
