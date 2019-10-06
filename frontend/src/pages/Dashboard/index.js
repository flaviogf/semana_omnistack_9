import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import api from '../../services/api'

import './styles.css'

export default function Dashboard() {
  const [spots, setSpots] = useState([])

  useEffect(() => {
    async function loadSpots() {
      const user = localStorage.getItem('@user')

      const response = await api.get('/dashboard', { headers: { user } })

      setSpots(response.data)
    }

    loadSpots()
  }, [])

  return (
    <>
      <ul className="Dashboard__spots">
        {spots.map(spot => (
          <li key={spot._id}>
            <header
              className="Dashboard__spot-header"
              style={{ backgroundImage: `url('${spot.thumbnailUrl}')` }}
            />
            <h3 className="Dashboard__spot-company">{spot.company}</h3>
            <p className="Dashboard__spot-price">
              {spot.price ? `R$ ${spot.price}` : 'GRATUITO'}
            </p>
          </li>
        ))}
      </ul>
      <Link className="App__btn" to="/new">
        Cadastrar novo spot
      </Link>
    </>
  )
}
