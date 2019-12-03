import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import firebase from '../firebase/firebase.js';

export default class CameraComponent extends Component {

constructor(prop) {
    super(prop)
    this.state = {
        hasCameraPermissions: null,
        type: Camera.Constants.Type.back
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


  render() {
    
    const {hasCameraPermissions} = this.state

    if (hasCameraPermissions === null) {
        return <View/>
    } else if (hasCameraPermissions === false) {
        return <Text>No Access to Camera </Text>
    } else {
        return (
            <View style={{flex:1}}>
                <Camera style={{flex:1}} type={this.state.type}>
                    <View
                    style={{
                    flex: 1,
                    backgroundColor: 'transparent',
                    flexDirection: 'row',
                    }}>
                        <TouchableOpacity
                        style={{
                            flex: 0.1,
                            alignSelf: 'flex-end',
                            alignItems: 'center',
                        }}
                        onPress={() => {
                            this.setState({
                                type: this.state.type === Camera.Constants.Type.back ?
                                    Camera.Constants.Type.front :
                                    Camera.Constants.Type.back
                            })
                        }}>
                        <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                            {' '}
                            Flip{' '}
                        </Text>
                        </TouchableOpacity>
                        
                    </View>

                </Camera>
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