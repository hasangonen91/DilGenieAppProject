import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React from 'react'
import BackHeader from '../../../components/header/BackHeader';
import DragDropQuizComponent from '../../../components/dragDrop/nes';
import MainComponent from '../../..//components/MainComponent/MainComponent';


const A2level = () => {
  return (
    <MainComponent headerTitle="A2 Level">

      <View style={styles.container}>
        <DragDropQuizComponent />
      </View>
    </MainComponent>
  )
}

export default A2level

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020825',
    justifyContent: 'center',
    alignItems: 'center',
  }
})