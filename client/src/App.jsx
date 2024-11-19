import { useState , useEffect } from 'react'
import './App.css'
import Routing from './routes/Routing'
import { ToastContainer } from 'react-toastify'

function App() {

  return (
    <>
      <Routing />
      <ToastContainer/>
    </>
  )
}

export default App
