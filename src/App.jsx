import { useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Layout } from './Layout'
import { UserPage } from './pages/User/UserPage'
import { Dashboard } from './pages/Dashboard/Dashboard';
import { FoodPage } from './pages/Food/FoodPage';
import { User } from './pages/User/User';
import { KriteriaPage } from './pages/Kriteria/KriteriaPage';
import { PenilaianPage } from './pages/Penilaian/PenilaianPage';

function App() {

  return (
    <>
    <Routes>
        <Route element={<Layout/>} >
          <Route path="/" element={<Dashboard />} />
          <Route path='/users' element={<User/>} />
          <Route path='/food' element={<FoodPage />} />
          <Route path='/criteria' element={<KriteriaPage />} />
          <Route path='/score' element={<PenilaianPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
