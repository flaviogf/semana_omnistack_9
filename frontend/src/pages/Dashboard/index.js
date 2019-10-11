import React, { useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import io from 'socket.io-client'

import api from '../../services/api'

import './styles.css'

export default function Dashboard() {
  const [spots, setSpots] = useState([])
  const [requests, setRequests] = useState([])

  const user = localStorage.getItem('@user')

  const socket = useMemo(
    () => io('http://localhost:3333', { query: { user } }),
    [user]
  )

  useEffect(() => {
    socket.on('request_book', data => {
      setRequests([...requests, data])
    })
  }, [requests, socket])

  useEffect(() => {
    async function loadSpots() {
      const response = await api.get('/dashboard', { headers: { user } })

      setSpots(response.data)
    }

    loadSpots()
  }, [user])

  async function accept(request) {
    await api.post(`/booking/${request._id}/accept`)
    setRequests(requests.filter(it => it._id !== request._id))
  }

  async function reject(request) {
    await api.post(`/booking/${request._id}/reject`)
    setRequests(requests.filter(it => it._id !== request._id))
  }

  return (
    <>
      <ul>
        {requests.map(request => (
          <li className="Dashboard__request" key={request._id}>
            <p className="Dashboard__request-message">
              O usuario
              <strong>{` ${request.user.email} `}</strong>
              solicitou uma reserva no spot
              <strong>{` ${request.spot.company} `}</strong>
              na data
              <strong>{` ${request.date} `}</strong>
            </p>
            <div>
              <button
                className="Dashboard__request-button Dashboard__request-accept"
                onClick={() => accept(request)}
                type="button"
              >
                ACEITAR
              </button>
              <button
                className="Dashboard__request-button Dashboard__request-reject"
                onClick={() => reject(request)}
                type="button"
              >
                RECUSAR
              </button>
            </div>
          </li>
        ))}
      </ul>

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
