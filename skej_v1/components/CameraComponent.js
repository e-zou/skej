import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';

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
    this.setState({
        hasCameraPermissions: status === 'granted'
    })
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