import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import { Platform } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import list from "../screens/EventList";

const screenWidth = Dimensions.get('window').width; 
const screenHeight = Dimensions.get('window').height; 

export default function EventCard(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>{props.name}</Text>
      <Text>{props.date}</Text>
      <Text> {props.location}</Text>
      <View style={styles.container}>
          <Text style={styles.paragraph}></Text>
            <MapView
                style={{ height: 400 }}
                region={props.state.mapRegion}
                onRegionChange={props.state.handleMapRegionChange}
              />
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    width: screenWidth*0.9,
    height: 400,
    shadowColor: 'grey',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
    margin: 10,
  },
  eventName: {
    fontSize: 18,
    fontWeight: 'bold'
  } 
});
