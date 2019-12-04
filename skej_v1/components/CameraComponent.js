import React, { Component } from 'react';
import { Image, View, Text, StyleSheet, TouchableOpacity, Button, Alert } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import firebase from '../firebase/firebase.js';

export default class CameraComponent extends Component {

constructor(prop) {
    super(prop)
    this.state = {
        hasCameraPermissions: null,
        type: Camera.Constants.Type.back,
        image: null,
    }
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
    let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1
      });
    //let result = await ImagePicker.launchImageLibraryAsync();

    if (!result.cancelled) {
        this.setState({ image: result.uri });
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


  render() {
    
    const {hasCameraPermissions} = this.state;
    let { image } = this.state;

    if (hasCameraPermissions === null) {
        return <View/>
    } else if (hasCameraPermissions === false) {
        return <Text>No Access to Camera </Text>
    } else {
        return ( 
            <View>
                <Button
                    title="Upload an image from Camera Roll"
                    onPress={this._pickImage}
                    />
                    {image &&
                    <Image source={{ uri: image }} style={{ width: 90, height: 90 }} />}
                    
                <Button title="Choose image..." onPress={this.onChooseImagePress} />
                {image &&
                    <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
            </View>
        )
    }
  }
}

const styles = StyleSheet.create({
  eventName: {
    fontSize: 18,
    fontWeight: 'bold'
  }
});