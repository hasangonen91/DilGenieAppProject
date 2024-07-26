import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MainComponent from '../../..//components/MainComponent/MainComponent';


const B1level = () => {
  return (
    <MainComponent headerTitle="B1 Level">

      <View style={styles.container}>

      </View>
    </MainComponent>
  )
}

export default B1level

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020825',
    justifyContent: 'center',
    alignItems: 'center',
  }
})