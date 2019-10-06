import React from 'react'

import Routes from './routes'

import './App.css'
import background from './assets/background.jpg'
import logo from './assets/logo.svg'

export default function App() {
  return (
    <div
      className="App__container"
      style={{ backgroundImage: `url('${background}')` }}
    >
      <img className="App__logo" src={logo} alt="AirCnC" />
      <div className="App__card">
        <Routes />
      </div>
    </div>
  )
}
