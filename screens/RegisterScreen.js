import React from 'react'
import { View } from 'react-native'
import { FormAuth } from '../components/FormAuth'
import { useNavigation } from '@react-navigation/native'

const RegisterScreen = () => {
  return (
    <View style={{flex:1}}>
      <FormAuth state='register'></FormAuth>
    </View>
  )
}

export default RegisterScreen