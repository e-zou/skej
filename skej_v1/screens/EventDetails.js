import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
// import { blue100 } from 'react-native-paper/lib/typescript/src/styles/colors';

export default class EventDetails extends Component {
  
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Image source={{ uri: navigation.getParam('pic', 'NO-IMAGE') }} style={styles.imageContainer}/>
        <View style={styles.detailsContainer}>
          <Text style={styles.eventName}>
            Event: {navigation.getParam('name', 'NO-NAME')}
          </Text>
          <Text>
            Date: {navigation.getParam('date', 'NO-DATE')}
          </Text>
          <Text>
            Location: {navigation.getParam('location', 'NO-LOCATION')}
          </Text>
          <Text>
            Description: {navigation.getParam('desc', 'NO-DESCRIPTION')}
          </Text>
          <Text>
            {navigation.getParam('desc', 'NO-DESCRIPTION')}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 10,
    alignItems: 'center',
    // backgroundColor: 'blue',
    margin: 10,
  },
  eventName: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  detailsContainer: {
    padding: 20,
    alignItems: 'center',
  },
  imageContainer: {
    width: Dimensions.get('window').width*0.8,
    height: Dimensions.get('window').width*0.8,
  }
});