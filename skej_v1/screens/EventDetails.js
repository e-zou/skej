import React, { Component } from 'react';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import getDirections from 'react-native-google-maps-directions'
import { View, Text, StyleSheet, Image, Dimensions , TouchableOpacity, Share} from 'react-native';
// import { blue100 } from 'react-native-paper/lib/typescript/src/styles/colors';


export default class EventDetails extends Component {
  
  render() {
    const { navigation } = this.props;
    let address = navigation.getParam('state');
    let currentlat = address.latitude;
    let currentlong = address.longitude;
    // console.log(address.latitude);
    // console.log(navigation.getParam('state'));
    // console.log(navigation.getParam('coords'));
    // console.log(navigation.getParam('state'));
    return (
      <View styles={styles.container}>
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
      <TouchableOpacity onPress={async () => {  
        const data = {

      source:{
        latitude: currentlat, 
        longitude: currentlong,
      },
      destination: {
        latitude: navigation.getParam('lat'), 
        longitude: navigation.getParam('long')
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
    }
  
    getDirections(data)
  }}>
      <Text> Directions </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={ async () => {
    try {
      const result = await Share.share({
        message:
          'Hey check out this event! ',
      });
  
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  }}>
      <Text> Share </Text>
      </TouchableOpacity>
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