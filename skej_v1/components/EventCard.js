import * as React from 'react';
import { Text, View, StyleSheet, Image} from 'react-native';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width; 
const screenHeight = Dimensions.get('window').height; 

export default function EventCard(props) {
  return (
    <View style={styles.cardContainer}>
      <Image source={{ uri: props.pic }} style={styles.imageContainer}/>
      <View style={styles.textContainer}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.eventName}>{props.name}</Text>
        <Text numberOfLines={1} ellipsizeMode="tail">{props.date}</Text>
        <Text numberOfLines={1} ellipsizeMode="tail">{props.location}</Text>
        <Text numberOfLines={2} ellipsizeMode="tail">{props.desc}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    width: screenWidth*0.9,
    height: 100,
    shadowColor: 'grey',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
    margin: 10,
  },
  eventName: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  imageContainer: {
    width: 90,
    height: 90,
    margin: 5
  }, 
  textContainer: {
    margin: 5,
    flexShrink: 1,
  }
});
