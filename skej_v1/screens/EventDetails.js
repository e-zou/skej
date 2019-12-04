import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import getDirections from 'react-native-google-maps-directions'



export default class EventDetails extends Component {
  
  
  render() {
    const { navigation } = this.props;
    //console.log(navigation.getParam('state'));
   // console.log(navigation.getParam('coords'));
    //console.log(navigation.getParam('state'));
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
          >
                <MapViewDirections 
                origin={navigation.getParam('state')}
                destination={{latitude: navigation.getParam('lat'), longitude: navigation.getParam('long')}}
                apikey={'AIzaSyALZIr2GgXQHbTc9V8uiyangXZ_zG1cCoA'}
                strokeColor="hotpink"
                strokeWidth={2.5}
                />
              <Marker coordinate={{latitude: navigation.getParam('lat'), longitude: navigation.getParam('long')}} title={"Event Location: " + navigation.getParam('name', 'NO-NAME')}/>
              <Marker coordinate={navigation.getParam('state')} title={"Current Location"} pinColor={"#0000FF"}/>
      </MapView>
      <View style={styles.container}>
      <TouchableOpacity onPress={this.handleGetDirections}>
      <Text> Directions </Text>
      </TouchableOpacity>
      </View>
      </View>
    );
  }
}

handleGetDirections = () => {
  const data = {
    source: {
      latitude: -33.8356372,
      longitude: 18.6947617
    },
    destination: {
      latitude: -33.8356372,
      longitude: 18.9947617,
    },
    params: [
      {
        key: "travelmode",
        value: "walking"        // may be "walking", "bicycling" or "transit" as well
      },
      {
        key: "dir_action",
        value: "navigate"       // this instantly initializes navigation using the given travel mode
      }
    ],
    /*  
      waypoints: [
      {
        latitude: -33.8600025,
        longitude: 18.697452
      },
      {
        latitude: -33.8600026,
        longitude: 18.697453
      },
         {
        latitude: -33.8600036,
        longitude: 18.697493
      }
    ] */
  }

  getDirections(data)
}

const styles = StyleSheet.create({
  eventName: {
    fontSize: 18,
    fontWeight: 'bold'
  }
});