import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React from 'react'
import MainComponent from '../../..//components/MainComponent/MainComponent';
import ListeningExercise from '../../../components/Listening/Listening';

const A2level = () => {
  return (
    <MainComponent headerTitle="A2 Level">
      <View style={styles.container}>
        <ListeningExercise />
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