import React from 'react';
import firebase from "./firebase/firebase.js";

import { Text, View, ScrollView, StyleSheet, FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import EventCard from './components/EventCard.js'
import { Dimensions } from 'react-native';

const Data = [
  {
    id: '1',
    name: 'First Item',
    date: "date",
    pic: 1,
  },
  {
    id: '2',
    name: 'Second Item',
    date: "date",
    pic: 2,
  },
  {
    id: '3',
    name: 'Third Item',
    date: "date",
    pic: 3,
  },
];

class HomeScreen extends React.Component {

  componentDidMount(){
    const test = firebase.database().ref("test name");
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style = {styles.header_text}>All Items</Text>
        <ScrollView>
          <View>
            <FlatList
              data={Data}
              renderItem={({ item }) => (
                <EventCard
                  id={item.id}
                  name={item.name}
                  pic={item.pic}
                  date={item.date}
                />
              )}
              keyExtractor={item => item.id}
            />
          </View>
        </ScrollView>
      </View>
    );
}
};
class CreateScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Create!</Text>
      </View>
    );
  }
}

class ProfileScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, flexDirection: "colunm", justifyContent: 'center', alignItems: 'center' }}>
        <Text>Profile</Text>
      </View>
    );
  }
}

class Icon extends React.Component {
  render() {
    const { name, color, size } = this.props;
    return (
      <View style={{ width: 24, height: 24, margin: 5 }}>
        <Ionicons name={name} size={size} color={color} />
      </View>
    );
  }
}

const HomeIcon = props => {
  // You should pass down the badgeCount in some other ways like context, redux, mobx or event emitters.
  return <Icon {...props} />;
};

const getTabBarIcon = (navigation, tintColor) => {
  const { routeName } = navigation.state;
  let IconComponent = Ionicons;
  let iconName;
  if (routeName === 'Home') {
    iconName = `ios-home`;
    IconComponent = HomeIcon;
  } else if (routeName === 'Create') {
    iconName = `ios-create`;
  } else if (routeName === 'Profile') {
    iconName = `ios-person`;
  };

  // You can return any component that you like here!
  return <IconComponent name={iconName} size={25} color={tintColor} />;
};

export default createAppContainer(
  createBottomTabNavigator(
    {
      Home: { screen: HomeScreen },
      Create: { screen: CreateScreen },
      Profile: { screen: ProfileScreen },
    },
    {
      defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ tintColor }) =>
          getTabBarIcon(navigation, tintColor),
      }),
      tabBarOptions: {
        activeTintColor: '#6FC4FA',
        inactiveTintColor: 'gray',
      },
    }
  )
);


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
