import React, { Component } from 'react';
import { Button, View, Text, StyleSheet, Alert, Keyboard } from 'react-native';
import firebase from '../firebase/firebase.js';
import t from 'tcomb-form-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';


const Form = t.form.Form;

const Event = t.struct({
    name: t.String,
    pic: t.String,
    date: t.String
});

let addEvent = event => {
    firebase.database().ref('/events').push({
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
            event: {},
            hasCameraPermissions: null,
            type: Camera.Constants.Type.back
        };
    }


    async componentWillMount(){
        const {status} = await Permissions.askAsync(Permissions.CAMERA)
        this.getPermissionAsync();
        this.setState({
            hasCameraPermissions: status === 'granted'
        })
    }

    getPermissionAsync = async () => {
        
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
        }
        
    }

    onChooseImagePress = async () => {
        let result = await ImagePicker.launchCameraAsync();
        //let result = await ImagePicker.launchImageLibraryAsync();

        if (!result.cancelled) {
        this.uploadImage(result.uri, "test-image")
            .then(() => {
            Alert.alert("Success");
            })
            .catch((error) => {
            Alert.alert(error);
            });
        }
    }

    uploadImage = async (uri, imageName) => {
        const response = await fetch(uri);
        const blob = await response.blob();

        var ref = firebase.storage().ref().child("images/" + imageName);
        return ref.put(blob);
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
                {/* <TouchableOpacity onPress={()=> this.props.navigation.navigate('CameraScreen')}><Text>Take Picture</Text></TouchableOpacity> */}
                <Button title="Choose image..." onPress={this.onChooseImagePress} />
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
  });