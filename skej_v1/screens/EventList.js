import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import EventCard from '../components/EventCard.js';
import { Dimensions } from 'react-native';
import firebase from '../firebase/firebase.js';

let eventsRef = firebase.database().ref('/events').orderByKey();

export default class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: []
        }
    }

    componentDidMount() {
        eventsRef.on('value', snapshot => {
        let data = snapshot.val();
        let events = Object.values(data);
        this.setState({ events });
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style = {styles.header_text}>All Events</Text>
                {this.state.events.length > 0 ? (
                    <ScrollView>
                    <View>
                        <FlatList
                        data= {this.state.events}
                        renderItem={({ item }) => (
                            <TouchableOpacity key={item.id} onPress={() => this.props.navigation.navigate('EventDetails')}>  
                                <EventCard
                                id={item.id}
                                name={item.name}
                                pic={item.image}
                                date={item.date}
                                />
                            </TouchableOpacity>
                        )}
                        keyExtractor={item => item.id}
                        />
                    </View>
                    </ScrollView>
                ) : (
                    <Text>No events</Text>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  header_text: {
    fontSize: 28,
    textAlign: 'left',
    paddingLeft: 25,
    paddingTop: 25,
    width: '100%',
  },
});