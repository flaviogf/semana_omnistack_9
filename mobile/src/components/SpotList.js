import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, Image, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

import api from '../services/api'

const style = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1
  },

  title: {
    fontWeight: 'bold',
    fontSize: 18
  },

  image: {
    height: 125,
    width: 125,
    resizeMode: 'contain'
  },

  company: {
    fontWeight: 'bold'
  },

  price: {
    color: '#ddd'
  }
})

export default function SpotList({ tech }) {
  const [spots, setSpots] = useState([])

  useEffect(() => {
    async function loadSpots() {
      const response = await api.get('/spot', {
        params: { tech }
      })

      setSpots(response.data)
    }

    loadSpots()
  }, [])

  return (
    <View style={style.container}>
      <Text style={style.title}>{tech}</Text>

      <FlatList
        renderItem={({ item }) => (
          <View>
            <Image style={style.image} source={{ uri: item.thumbnailUrl }} />
            <Text style={style.company}>{item.company}</Text>
            <Text style={style.price}>
              {item.price ? `R$ ${item.price}/dia` : 'GRATUITO'}
            </Text>
          </View>
        )}
        keyExtractor={(item) => item._id}
        data={spots}
      />
    </View>
  )
}

SpotList.propTypes = {
  tech: PropTypes.string.isRequired
}
