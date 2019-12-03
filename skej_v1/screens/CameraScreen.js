import React, { Component } from 'react';
import { Button, View, Text, StyleSheet, Alert, Keyboard } from 'react-native';
import CameraComponent from '../components/CameraComponent.js';


export default class CameraScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    
        
    render() {
        return (
            
            <CameraComponent></CameraComponent>
       
        );
    }
}  
  
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        backgroundColor: '#ffffff',
    },
});