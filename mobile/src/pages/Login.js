import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity
} from 'react-native'

import logo from '../../assets/logo.png'

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
    borderRadius: 3,
    marginTop: 10,
    height: 45
  },

  buttonText: {
    fontWeight: 'bold',
    color: '#ffffff'
  }
})

export default function Login() {
  return (
    <KeyboardAvoidingView style={style.container} behavior="padding" enabled>
      <Image source={logo} style={style.image} />

      <View style={style.form}>
        <Text style={style.label}>SEU E-MAIL *</Text>
        <TextInput
          style={style.input}
          placeholder="Seu e-mail"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorret={false}
        />

        <Text style={style.label}>TECNOLOGIAS *</Text>
        <TextInput
          style={style.input}
          placeholder="Teconologias de interesse"
          autoCapitalize="words"
          autoCorret={false}
        />

        <TouchableOpacity style={style.button}>
          <Text style={style.buttonText}>Encontrar sposts</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}
