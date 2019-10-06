import React, { useState, useMemo } from 'react'
import PropTypes from 'prop-types'

import './styles.css'

import camera from '../../assets/camera.svg'

import api from '../../services/api'

export default function New({ history }) {
  const [thumbnail, setThumbnail] = useState('')
  const [company, setCompany] = useState('')
  const [techs, setTechs] = useState('')
  const [price, setPrice] = useState('')

  const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : camera
  }, [thumbnail])

  async function onSubmit(e) {
    e.preventDefault()

    const user = localStorage.getItem('@user')

    const data = new FormData()

    data.append('thumbnail', thumbnail)
    data.append('company', company)
    data.append('techs', techs)
    data.append('price', price)

    await api.post('/spot', data, { headers: { user } })

    history.push('/dashboard')
  }

  return (
    <form onSubmit={onSubmit}>
      <label
        className="New__label-file"
        htmlFor="company"
        style={{ backgroundImage: `url('${preview}')` }}
      >
        <input
          className="New__input-file"
          id="company"
          type="file"
          placeholder="Sua empresa incrível"
          onChange={e => setThumbnail(e.target.files[0])}
        />
      </label>

      <label htmlFor="company">
        EMPRESA *
        <input
          id="company"
          type="text"
          placeholder="Sua empresa incrível"
          value={company}
          onChange={e => setCompany(e.target.value)}
        />
      </label>

      <label htmlFor="company">
        <p>
          TECNOLOGIAS *<small> (separadas por virgula)</small>
        </p>
        <input
          id="company"
          type="text"
          placeholder="Quais tecnologias usam?"
          value={techs}
          onChange={e => setTechs(e.target.value)}
        />
      </label>

      <label htmlFor="company">
        <p>
          VALOR DA DIÁRIA *<small> (em branco para GRATUITO)</small>
        </p>
        <input
          id="company"
          type="text"
          placeholder="Valor cobrado por dia"
          value={price}
          onChange={e => setPrice(e.target.value)}
        />
      </label>

      <button className="App__btn" type="submit">
        Cadastrar
      </button>
    </form>
  )
}

New.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
}
