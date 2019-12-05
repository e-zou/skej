import React, { Component } from 'react';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import getDirections from 'react-native-google-maps-directions'
import { View, Text, StyleSheet, ScrollView, Image, Dimensions , TouchableOpacity, Share} from 'react-native';


export default class EventDetails extends Component {
  render() {
    const { navigation } = this.props;
    let address = navigation.getParam('state');
    let currentlat = address.latitude;
    let currentlong = address.longitude;

    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollview_container}>
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
              {navigation.getParam('desc', 'NO-DESCRIPTION')}
            </Text>
          </View>
          <View style={styles.linksContainer}>
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
              };
              getDirections(data);
            }}>
              <Text style={{color: 'blue'}}>Open Directions in Google Maps</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={ async () => {
              try {
                let composedMessage = 
                  'Hey, check out this event on Skej! \n' +
                  navigation.getParam('name', 'NO-NAME') + '\n' +
                  navigation.getParam('date', 'NO-DATE') + '\n' + 
                  navigation.getParam('location', 'NO-LOCATION') + '\n' +
                  navigation.getParam('desc', 'NO-DESCRIPTION');
                const result = await Share.share({
                  message:
                    composedMessage,
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
              <Text style={{color: 'blue'}}>Share this Event</Text>
            </TouchableOpacity>
          </View>
          <MapView
              style={styles.mapContainer}
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
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
  },
  eventName: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  detailsContainer: {
    padding: 10,
    alignItems: 'center',
  },
  imageContainer: {
    width: Dimensions.get('window').width*0.95,
    height: Dimensions.get('window').height*0.3,
  }, 
  mapContainer: {
    width: Dimensions.get('window').width*0.95,
    height: Dimensions.get('window').height*0.5,
  },
  linksContainer: {
    paddingBottom: 10,
    alignItems: 'center',
  },
  scrollview_container: {
    height: Dimensions.get('window').height*0.7,
  }
});