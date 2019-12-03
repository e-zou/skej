import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';

export default class EventDetails extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Image source={{ uri: navigation.getParam('pic', 'NO-IMAGE') }} style={styles.imageContainer}/>
        <View style={styles.detailsContainer}>
          <Text style={styles.eventName}>
            {navigation.getParam('name', 'NO-NAME')}
          </Text>
          <Text>
            {navigation.getParam('date', 'NO-DATE')}
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
  },
  eventName: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  detailsContainer: {
    padding: 10,
  },
  imageContainer: {
    width: Dimensions.get('window').width*0.8,
    height: Dimensions.get('window').height*0.25,
    padding: 20,
  }
});