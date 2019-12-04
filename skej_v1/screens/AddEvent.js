import React, { Component } from 'react';
import { Button, Image, View, Text, StyleSheet, Alert, Keyboard } from 'react-native';
import firebase from '../firebase/firebase.js';
import t from 'tcomb-form-native';
import CameraComponent from '../components/CameraComponent.js';


const Form = t.form.Form;

const Event = t.struct({
    name: t.String,
    date: t.Date,
    description: t.String,
    location: t.String,
});

let addEvent = (event, image) => {
    firebase.database().ref('/events').push({
        name: event.name,
        pic: image,
        date: event.date,
        desc: event.description,
        location: event.location,
    });
    // console.log('event: ', event);
};




export default class AddEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            event: {},
            image: null
        };
    }

        
    handleSubmit = () => {
        const value = this._form.getValue();
        const pic = this.state.image;
        // console.log('value: ', value);
        // console.log('pic', pic);
        if (value != null && pic != null) {
            addEvent(value, pic);
            Keyboard.dismiss(); 
            Alert.alert('Your event was successfully created!');
            this.props.navigation.navigate('Home');
        } else {
            Keyboard.dismiss();
            if (pic == null) {
                Alert.alert('You must select an image.');
            } else {
                Alert.alert('All fields are required.');
            }
        }
    }
        
    render() {
        let { image } = this.state;
        return (
            <View style={styles.container}>
                <Text style = {styles.header_text}>Create an Event</Text>
                <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 20 }}>
                </View>
                <View style={styles.form_container}>
                <Form 
                    ref={c => this._form = c} 
                    type={Event} 
                />
                <CameraComponent/>
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
        flex:1,
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
    descTextbox: {
        height: 100,
    }
  });