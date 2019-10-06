import React, { useState } from 'react'
import PropTypes from 'prop-types'

import api from '../../services/api'

export default function Login({ history }) {
  const [email, setEmail] = useState('')

  async function onSubmit(e) {
    e.preventDefault()

    const response = await api.post('/session', { email })

    localStorage.setItem('@user', response.data._id)

    history.push('/dashboard')
  }

  return (
    <>
      <h3>
        Ofereça
        <span> spots </span>
        para programadores e encontre
        <span> talentos </span>
        para sua empresa
      </h3>

      <form onSubmit={onSubmit} noValidate>
        <label htmlFor="email">
          E-MAIL *
          <input
            onChange={e => setEmail(e.target.value)}
            placeholder="Seu melhor email."
            value={email}
            type="email"
            id="email"
          />
        </label>
        <button className="App__btn" type="submit">
          Cadastrar
        </button>
      </form>
    </>
  )
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
}
