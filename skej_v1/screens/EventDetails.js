import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class EventDetails extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <View>
        <Text style={styles.eventName}>
          {navigation.getParam('name', 'NO-NAME')}
        </Text>
        <Text>
          {navigation.getParam('date', 'NO-DATE')}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  eventName: {
    fontSize: 18,
    fontWeight: 'bold'
  }
});