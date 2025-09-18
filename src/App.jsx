import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useContext } from 'react'
import { CurrentUserContext } from './context/ContextAPI'
import LoginPage from './components/pages/loginPage'

function App() {
  const { jwt, login, logout, error, loading } = useContext(CurrentUserContext);


  return (
    <LoginPage/>
  )
}

export default App
