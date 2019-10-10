import React, { useState, useEffect } from 'react'
import {
  AsyncStorage,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Image
} from 'react-native'

import SpotList from '../components/SpotList'

import logo from '../../assets/logo.png'

const style = StyleSheet.create({
  container: {
    flex: 1
  },

  logo: {
    alignSelf: 'center',
    margin: 32
  }
})

export default function List() {
  const [techs, setTechs] = useState([])

  useEffect(() => {
    async function loadTechs() {
      const storageTechs = await AsyncStorage.getItem('@techs')

      setTechs(storageTechs.split(',').map((it) => it.trim()))
    }

    loadTechs()
  }, [])

  return (
    <SafeAreaView style={style.container}>
      <ScrollView>
        <Image style={style.logo} source={logo} />

        {techs.map((it) => (
          <SpotList key={it} tech={it} />
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}
