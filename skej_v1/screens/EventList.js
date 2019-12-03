import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import EventCard from '../components/EventCard.js';
import { Dimensions } from 'react-native';
import firebase from '../firebase/firebase.js';

export default class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [],
        }
    }

    componentDidMount() {
        const rootRef = firebase.database().ref();
        const eventsRef = rootRef.child("events");
        eventsRef.on("value", snap => {
            const foo = snap.val();
            if (foo !== null) {  
                var eventsList = new Array ();
                Object.keys(foo).forEach(key => {
                    var item = {
                        id: key, //this is to get the ID
                        name: foo[key].name,
                        pic: foo[key].pic,
                        date: foo[key].date,
                        location: foo[key].location,
                        desc: foo[key].desc,
                    }
                    eventsList.push(item);
                });
                // console.log(eventsList)
                this.setState({ events : eventsList });
            }
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style = {styles.header_text}>All Events</Text>
                {this.state.events.length > 0 ? (
                    <ScrollView style={styles.scrollview_container}>
                    <View>
                        <FlatList
                        data= {this.state.events}
                        renderItem={({ item }) => (
                            <TouchableOpacity key={item.id} onPress={() => {
                                    this.props.navigation.navigate('EventDetails', {
                                        name: item.name,
                                        pic: item.pic,
                                        date: item.date,
                                        desc: item.desc,
                                        location: item.location,
                                    });
                                }}>  
                                <EventCard
                                name={item.name}
                                pic={item.pic}
                                date={item.date}
                                desc={item.desc}
                                location={item.location}
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
  },
  scrollview_container: {
    padding: 10,
    height: Dimensions.get('window').height*0.8,
  },
  header_text: {
    fontSize: 28,
    textAlign: 'left',
    paddingLeft: 20,
    paddingTop: 20,
    paddingBottom: 5,
    width: '100%',
  },
});