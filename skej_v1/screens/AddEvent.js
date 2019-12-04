import React, { Component } from 'react';
import { Button, Image, View, Text, StyleSheet, Alert, Keyboard } from 'react-native';
import firebase from '../firebase/firebase.js';
import t from 'tcomb-form-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';

import uuid from 'uuid/v4'; // Import UUID to generate UUID


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
            hasCameraPermissions: null,
            type: Camera.Constants.Type.back,
            image: null,
            imageSrc: null,
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
    
    takeImage = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
          });
    
        if (!result.cancelled) {
            this.setState({ image: result.uri });
            let ext = this.state.image.split('.').pop(); // Extract image extension
            let filename = `${uuid()}.${ext}`; // Generate unique name

            this.setState({imageSrc: filename})
            
        }
    }
    
    pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1
        });
    
        if (!result.cancelled) {
          this.setState({ image: result.uri });
          let ext = this.state.image.split('.').pop(); // Extract image extension
          let filename = `${uuid()}.${ext}`; // Generate unique name

          this.setState({imageSrc: filename});
            
        }
        
    };
    
    uploadImage = async (uri, imageName) => {
        const response = await fetch(uri);
        console.log(response);
        const blob = await response.blob();
        console.log(blob);
        firebase.storage().ref().child("images/" + imageName).put(blob);
      
    }
        
    handleSubmit = () => {
        const value = this._form.getValue();

        const pic = this.state.image;
        // // console.log('value: ', value);
        // // console.log('pic', pic);
        if (value != null && pic != null) {
            Alert.alert('What is my picture value' + pic);
            addEvent(value, pic);

            this.uploadImage(this.state.image, this.state.imageSrc)
            .then(() => {
              Alert.alert("Success");
            })
            .catch((error) => {
              Alert.alert(error);
            });

            Keyboard.dismiss(); 
            Alert.alert('Your event was successfully created!');
            this.props.navigation.navigate('Home');
        } else {
            Alert.alert('Either null value or null pic');
            Keyboard.dismiss();
            if (pic == null) {
                Alert.alert('You must select an image.');
            } else {
                Alert.alert('All fields are required.');
            }
        }
        // Alert.alert('What is my picture value' + this.state.image);
    }


        
    render() {
        let { image } = this.state;
        let {hasCameraPermissions} = this.state;

        if (hasCameraPermissions === null) {
            return <View/>
        } else if (hasCameraPermissions === false) {
            return <Text>No Access to Camera </Text>
        } else {
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
                    <Button
                        title="Upload an image from Camera Roll"
                        onPress={this.pickImage}
                        />
                        {image &&
                        <Image source={{ uri: image }} style={{ width: 10, height: 10 }} />}

                    <Button title="Choose image..." onPress={this.takeImage} />
                    {/* {image &&
                        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />} */}
                    
                    <Button
                        title="Create Event"
                        onPress={this.handleSubmit}
                    />
                    </View>
                </View>


            )
        }
    

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