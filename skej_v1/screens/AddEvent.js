import React, { Component } from 'react';
import { Button, Image, View, Text, StyleSheet, Alert, Keyboard } from 'react-native';
import firebase from '../firebase/firebase.js';
import t from 'tcomb-form-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

const Form = t.form.Form;

const Event = t.struct({
    name: t.String,
    date: t.Date,
    desc: t.String
});

let addEvent = (event, image) => {
    firebase.database().ref('/events').push({
        name: event.name,
        pic: image,
        date: event.date,
        desc: event.desc,
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
                <View style={{ paddingTop: 20 }}>
                    <Button
                    title="Upload an image from Camera Roll"
                    onPress={this._pickImage}
                    />
                    {image &&
                    <Image source={{ uri: image }} style={{ width: 90, height: 90 }} />}
                </View>
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

    componentDidMount() {
        this.getPermissionAsync();
    }

    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
          const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
          if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
          }
        }
    }
    
    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1
        });
    
        // console.log(result);
    
        if (!result.cancelled) {
          this.setState({ image: result.uri });
        }
    };
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
    descTextbox: {
        height: 100,
    }
  });