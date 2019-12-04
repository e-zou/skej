import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import EventCard from '../components/EventCard.js';
import { Dimensions } from 'react-native';
import firebase from '../firebase/firebase.js';
import { Platform } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

export default class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [],
            mapRegion: null,
            location: null,
            errorMessage: null,
        }
    }
   
      componentWillMount() {
        if (Platform.OS === 'android' && !Constants.isDevice) {
          this.setState({
            errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
          });
        } else {
          this._getLocationAsync();
        }
      }
    
      _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
          this.setState({
            errorMessage: 'Permission to access location was denied',
          });
        }
    
        let location = await Location.getCurrentPositionAsync({});
        this.setState({ location: location });
        this.setState({mapRegion: { latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }});
      };
    
     
    
    componentDidMount() {
        const rootRef = firebase.database().ref();
        const eventsRef = rootRef.child("events");
        eventsRef.on("value", snap => {
            const foo = snap.val();
            if (foo !== null) {  
                var eventsList = new Array ();
                Object.keys(foo).forEach(key => {
                    var item = {
                        id: key, //this is to get the ID
                        name: foo[key].name,
                        location: foo[key].location,
                        lat: foo[key].lat,
                        long: foo[key].long,
                        pic: foo[key].image,
                        date: foo[key].date,
                    }
                    eventsList.push(item);
                });
                // console.log(eventsList)
                this.setState({ events : eventsList });
            }
        });
    }

    render() {
            let text = 'Waiting..';
            if (this.state.errorMessage) {
              text = this.state.errorMessage;
            } else if (this.state.location) {
              text = JSON.stringify(this.state.location);
            }
        return (
            <View style={styles.container}>
                <Text style = {styles.header_text}>All Events</Text>
                {this.state.events.length > 0 ? (
                    <ScrollView style={styles.scrollview_container}>
                    <View>
                        <FlatList
                        data= {this.state.events}
                        renderItem={({ item }) => (
                            <TouchableOpacity key={item.id} onPress={() => {
                                    this.props.navigation.navigate('EventDetails', {
                                        name: item.name,
                                        date: item.date,
                                        location: item.location,
                                        lat: item.lat,
                                        long: item.long,
                                        state: this.state.mapRegion,
                                        handle: this.state.handleMapRegionChange,
                                    });
                                
                                    //console.log(item.coords);
                                }}>  
                                <EventCard
                                name={item.name}
                                pic={item.image}
                                date={item.date}
                                location={item.location}
                                state={this.state}
                                />
                            </TouchableOpacity>
                        )}
                        keyExtractor={item => item.id}
                        />
                    </View>
                    </ScrollView>
                ) : (
                    <Text>No events</Text>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height-150,
    backgroundColor: '#4a4949',
  },
  scrollview_container: {
    padding: 10
  },
  header_text: {
    fontSize: 28,
    textAlign: 'left',
    paddingLeft: 20,
    paddingTop: 20,
    width: '100%',
    color: '#FFFFFF',
  },
});