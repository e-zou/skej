import React, { Component } from 'react';
import { Button, View, Text, TouchableHighlight, StyleSheet, TextInput, Alert } from 'react-native';
import firebase from '../firebase/firebase.js';
import t from 'tcomb-form-native';

const Form = t.form.Form;

const Event = t.struct({
    id: t.String,
    name: t.String,
    pic: t.String,
    date: t.String
});

let addEvent = event => {
    firebase.database().ref('/events').push({
        id: event.id,
        name: event.name,
        pic: event.pic,
        date: event.date
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
        addEvent(value);
        Alert.alert('Item saved successfully');
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
        paddingLeft: 25,
        paddingTop: 25,
        width: '100%',
    },
  });