import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
export default class EventDetails extends Component {
  
  render() {
    const { navigation } = this.props;
    //console.log(navigation.getParam('state'));
    console.log(navigation.getParam('lat'));
    console.log(navigation.getParam('long'));
    console.log(navigation.getParam('state'));
    return (
      <View>
        <Text style={styles.eventName}>
          {navigation.getParam('name', 'NO-NAME')}
        </Text>
        <Text>
          {navigation.getParam('date', 'NO-DATE')}
        </Text>
        
        <MapView
                style={{ height: 400 }}
                region={navigation.getParam('state')}
                onRegionChange={navigation.getParam('handle')}
              />
              <Marker coordinate={{ latitude: navigation.getParam('lat'), longitude: navigation.getParam('long')}}/>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  eventName: {
    fontSize: 18,
    fontWeight: 'bold'
  }
});