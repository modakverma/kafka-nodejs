import React from 'react'
import {Routes,Route} from 'react-router-dom'
import App from './App'
import Producer from './components/Producer'

const SiteRoutes = () => {
  return (

    <Routes>
        <Route path='/' element={<App/>}/>
        <Route path='/producer' element={<Producer/>}/>
    </Routes>
    
  )
}

export default SiteRoutes
