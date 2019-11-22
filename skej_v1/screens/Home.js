import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';

export default class Home extends Component {
    render() {
      return (
        <View>
          <Text>Home Screen</Text>
          <Button
            title="Add an Event"
            onPress={() => this.props.navigation.navigate('AddEvent')}
          />
          <Button
            title="List of Events"
            color="green"
            onPress={() => this.props.navigation.navigate('EventList')}
          />
        </View>
      );
    }
  }