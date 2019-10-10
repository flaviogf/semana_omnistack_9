import React, { useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  AsyncStorage
} from 'react-native'
import PropTypes from 'prop-types'

import api from '../services/api'

const style = StyleSheet.create({
  container: {
    paddingTop: 32,
    padding: 16,
    flex: 1
  },

  title: {
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 16
  },

  input: {
    paddingHorizontal: 8,
    borderColor: '#ddd',
    marginVertical: 5,
    borderRadius: 3,
    borderWidth: 1,
    height: 45
  },

  button: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
    borderRadius: 2,
    height: 45
  },

  buttonText: {
    fontWeight: 'bold',
    color: '#fff'
  },

  solicitationButton: {
    backgroundColor: '#f05a5b'
  },

  cancelationButton: {
    backgroundColor: '#ddd'
  }
})

export default function Book({ navigation }) {
  const { _id } = navigation.state.params

  const [date, setDate] = useState('')

  async function onSubmit() {
    const user = await AsyncStorage.getItem('@user')

    await api.post(
      '/booking',
      { spot: _id, date },
      {
        headers: { user }
      }
    )

    navigation.navigate('List')
  }

  return (
    <View style={style.container}>
      <Text style={style.title}>DATA DE INTERESSE *</Text>
      <TextInput
        placeholder="Qual data você quer reservar?"
        onChangeText={setDate}
        style={style.input}
        value={date}
      />

      <TouchableOpacity
        style={[style.button, style.solicitationButton]}
        onPress={onSubmit}
      >
        <Text style={style.buttonText}>Solicitar reservar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[style.button, style.cancelationButton]}
        onPress={() => navigation.navigate('List')}
      >
        <Text style={style.buttonText}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  )
}

Book.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    state: PropTypes.shape({
      params: PropTypes.shape({
        _id: PropTypes.string.isRequired
      }).isRequired
    }).isRequired
  }).isRequired
}
