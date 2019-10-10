import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import PropTypes from 'prop-types'
import { withNavigation } from 'react-navigation'

import api from '../services/api'

const style = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1
  },

  title: {
    fontSize: 20,
    margin: 5
  },

  spot: {
    margin: 5
  },

  image: {
    resizeMode: 'cover',
    height: 100,
    width: 175
  },

  company: {
    marginVertical: 2.5,
    fontWeight: 'bold',
    fontSize: 24
  },

  price: {
    marginVertical: 2.5,
    color: '#ddd',
    fontSize: 16
  },

  solicitationButton: {
    backgroundColor: '#f05a5b',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    marginTop: 10,
    height: 45
  },

  solicitationButtonText: {
    fontWeight: 'bold',
    color: '#ffffff'
  },

  bold: {
    fontWeight: 'bold'
  }
})

function SpotList({ tech, navigation }) {
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

  function selectSpot({ _id }) {
    navigation.navigate('Book', { _id })
  }

  return (
    <View style={style.container}>
      <Text style={style.title}>
        Empresas que usam
        <Text style={style.bold}> {tech}</Text>
      </Text>

      <FlatList
        renderItem={({ item }) => (
          <View style={style.spot}>
            <Image style={style.image} source={{ uri: item.thumbnailUrl }} />
            <Text style={style.company}>{item.company}</Text>
            <Text style={style.price}>
              {item.price ? `R$ ${item.price}/dia` : 'GRATUITO'}
            </Text>
            <TouchableOpacity
              onPress={() => selectSpot(item)}
              style={style.solicitationButton}
            >
              <Text style={style.solicitationButtonText}>
                Solicitar Reserva
              </Text>
            </TouchableOpacity>
          </View>
        )}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item._id}
        data={spots}
        horizontal
      />
    </View>
  )
}

SpotList.propTypes = {
  tech: PropTypes.string.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
}

export default withNavigation(SpotList)
