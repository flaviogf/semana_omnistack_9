import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  AsyncStorage
} from 'react-native'
import PropTypes from 'prop-types'

import logo from '../../assets/logo.png'

import api from '../services/api'

const style = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1
  },

  containerWrapper: {
    flex: 1
  },

  form: {
    alignSelf: 'stretch',
    padding: 16
  },

  label: {
    marginVertical: 5,
    fontWeight: 'bold'
  },

  input: {
    paddingHorizontal: 12,
    borderColor: '#ddd',
    borderRadius: 3,
    borderWidth: 1,
    height: 45
  },

  button: {
    backgroundColor: '#f05a5b',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    marginTop: 10,
    height: 45
  },

  buttonText: {
    fontWeight: 'bold',
    color: '#ffffff'
  }
})

export default function Login({ navigation }) {
  const [email, setEmail] = useState('')
  const [techs, setTechs] = useState('')

  async function onSubmit() {
    const response = await api.post('/session', { email, techs })

    const { _id } = response.data

    await Promise.all([
      AsyncStorage.setItem('@user', _id),
      AsyncStorage.setItem('@techs', techs)
    ])

    navigation.navigate('List')
  }

  return (
    <KeyboardAvoidingView style={style.container} behavior="padding" enabled>
      <Image source={logo} style={style.image} />

      <View style={style.form}>
        <Text style={style.label}>SEU E-MAIL *</Text>
        <TextInput
          onChangeText={setEmail}
          value={email}
          style={style.input}
          placeholder="Seu e-mail"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorret={false}
        />

        <Text style={style.label}>TECNOLOGIAS *</Text>
        <TextInput
          onChangeText={setTechs}
          value={techs}
          style={style.input}
          placeholder="Teconologias de interesse"
          autoCapitalize="words"
          autoCorret={false}
        />

        <TouchableOpacity style={style.button} onPress={onSubmit}>
          <Text style={style.buttonText}>Encontrar sposts</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

Login.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
}
