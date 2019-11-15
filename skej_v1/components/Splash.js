import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Constants, Image } from 'expo';
import { LinearGradient } from 'expo-linear-gradient';


export default class Splash extends React.Component {
  render() {
    return (
        <LinearGradient 
       start={[1,1]}
       end={[0.4, 0.3]}
        colors={[ '#FFFFFF', '#000D0C', '#000D0C',]} 
        style={styles.gradientStyles}>
          <Text style={styles.logo}> Skej </Text>
      </LinearGradient>
    )
  }
}

const styles = StyleSheet.create({
  gradientStyles:{
   flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo:{
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
    height:100,
  }
})