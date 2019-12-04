import React, { Component } from 'react';
import { Button, Image, View, Text, StyleSheet, Alert, Keyboard } from 'react-native';
import firebase from '../firebase/firebase.js';
import t from 'tcomb-form-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import uuid from 'uuid/v4'; // Import UUID to generate UUID
import { format } from 'date-fns';

const Form = t.form.Form;

const Event = t.struct({
    name: t.String,
    date: t.Date,
    description: t.String,
    location: t.String,
});

let addEvent = (event, image) => {
    var dt = event.date;
    // console.log('event.date: ', dt);
    var dtConverted = format(new Date(dt), 'PPp');
    // console.log('dtConverted: ', dtConverted);
    firebase.database().ref('/events').push({
        name: event.name,
        pic: image,
        date: dtConverted,
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
            hasCameraRollPermissions: null,
            type: Camera.Constants.Type.back,
            image: null,
            imageSrc: null,
        };
    }

    async componentWillMount(){
        this.getCameraPermissionAsync();
        this.getCameraRollPermissionAsync();
    }
    
    getCameraPermissionAsync = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        if (status !== 'granted') {
          alert('Sorry, we need camera permissions to make this work!');
        } else {
            this.setState({
                hasCameraPermissions: status === 'granted'
            })
        }
    }

    getCameraRollPermissionAsync = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
        } else {
            this.setState({
                hasCameraRollPermissions: status === 'granted'
            })
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
            Alert.alert("Image successfully taken.");
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

          Alert.alert("Image successfully chosen.");
        }
        
    };
    
    uploadImage = async (uri, imageName) => {
        const response = await fetch(uri);
        // console.log(response);
        const blob = await response.blob();
        // console.log(blob);
        firebase.storage().ref().child("images/" + imageName).put(blob);
    }
        
    handleSubmit = () => {
        const value = this._form.getValue();
        // https://firebasestorage.googleapis.com/v0/b/skej-3eec6.appspot.com/o/images%2Fa7d7e6d4-a871-4d45-bbd4-8b22580aa0d1.png?alt=media
        const url = "https://firebasestorage.googleapis.com/v0/b/skej-3eec6.appspot.com/o/images%2F"
        const pic = url + this.state.imageSrc + "?alt=media";
        // // console.log('value: ', value);
        // // console.log('pic', pic);
        if (value != null && pic != null) {
            this.uploadImage(this.state.image, this.state.imageSrc)
            .then(() => {
              Alert.alert("Image successfully uploaded.");
            })
            .catch((error) => {
              Alert.alert(error);
            });
            addEvent(value, pic);
            Keyboard.dismiss(); 
            Alert.alert('Your event was successfully created!');
            this.props.navigation.navigate('Home');
        } else {
            Keyboard.dismiss();
            if (pic == null) {
                Alert.alert('You must select or take an image.');
            } else {
                Alert.alert('All fields are required.');
            }
        }
        // Alert.alert('What is my picture value' + this.state.image);
    }
        
    render() {
        let { image } = this.state;
        let { hasCameraPermissions } = this.state;
        let { hasCameraRollPermissions } = this.state;

        if (hasCameraPermissions === null) {
            return <View/>
        } else if (hasCameraPermissions === false) {
            return <Text>No Access to Camera </Text>
        } else if (hasCameraRollPermissions === false) {
            return <Text>No Access to Camera Roll </Text>
        } else {
            return ( 
                <View style={styles.container}>
                    <Text style = {styles.header_text}>Create an Event</Text>
                    <View style={styles.cameraOptionsContainer}>
                    <Button
                        title="Upload an image from Camera Roll"
                        onPress={this.pickImage}
                        />
                    <Text style={{ textAlign: 'center' }}>or</Text>
                    <Button title="Take a Picture" onPress={this.takeImage} />
                    {image &&
                        <Image source={{ uri: image }} style={{ justifyContent: 'center', width: 50, height: 50 }} />}
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
            )
        }
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
    cameraOptionsContainer: {
        justifyContent: 'center',
        alignItems: 'center', 
        paddingTop: 10
    }
  });