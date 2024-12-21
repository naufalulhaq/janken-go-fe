import React from 'react'
import { View } from 'react-native'
import { FormAuth } from '../components/FormAuth'
import { useNavigation } from '@react-navigation/native'

export default function Register({navigation}) {
  return (
    <View style={{flex:1}}>
      <FormAuth state='register'></FormAuth>
    </View>
    
  )
}
