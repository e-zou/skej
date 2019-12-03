import React, { Component } from 'react';
import { Button, View, Text, StyleSheet, Alert, Keyboard } from 'react-native';
import firebase from '../firebase/firebase.js';
import t from 'tcomb-form-native';
import Geocoder from 'react-native-geocoding';

const Form = t.form.Form;
Geocoder.init("AIzaSyALZIr2GgXQHbTc9V8uiyangXZ_zG1cCoA"); // use a valid API key
const Event = t.struct({
    name: t.String,
    pic: t.String,
    date: t.String,
    location: t.String,
});

let  addEvent = async event => {
    let coord = await Geocoder.from(event.location)
        .then(json => {
            var address = json.results[0].geometry.location;
            console.log(address);
            return address;
        });
        console.log(coord);
    firebase.database().ref('/events').push({
        name: event.name,
        pic: event.pic,
        location: event.location,
        date: event.date,
        lat: coord.lat,
        long: coord.lng,
    });
    // console.log('event: ', event);
};

export default class AddEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            event: {}
        };
    }
    
    handleSubmit = () => {
        const value = this._form.getValue();
        // console.log('value: ', value);
        if (value != null ) {
            addEvent(value);
            Keyboard.dismiss(); 
            Alert.alert('Your event was successfully created!');
        } else {
            Keyboard.dismiss();
            Alert.alert('All fields are required.');
        }
    }
        
    render() {
        return (
            <View style={styles.container}>
                <Text style = {styles.header_text}>Create an Event</Text>
                <View style={styles.form_container}>
                <Form 
                    ref={c => this._form = c} 
                    type={Event} 
                />
                <Button
                    title="Create Event"
                    onPress={this.handleSubmit}
                />
                </View>
            </View>
        );
    }
}  
  
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        backgroundColor: '#ffffff',
    },
    form_container: {
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#ffffff',
    },
    header_text: {
        fontSize: 28,
        textAlign: 'left',
        paddingLeft: 20,
        paddingTop: 20,
        width: '100%',
    },
  });