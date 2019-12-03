//npm install --save react-native-geocoding
import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Text, View, ScrollView, StyleSheet, FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Platform } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';


import AddEvent from './screens/AddEvent';
import EventList from './screens/EventList';
import EventDetails from './screens/EventDetails';

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

const EventListStackNavigator = createStackNavigator(
  {
    EventList,
    EventDetails,
  },
  {
    initialRouteName: 'EventList',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#70649B',
      },
      headerTintColor: '#ffffff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);

const AddEventStackNavigator = createStackNavigator(
  {
    AddEvent,
  },
  {
    initialRouteName: 'AddEvent',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#70649B',
      },
      headerTintColor: '#ffffff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);

const AppNavigator = createBottomTabNavigator(
  {
    Home: EventListStackNavigator, 
    Create: AddEventStackNavigator 
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) =>
        getTabBarIcon(navigation, tintColor),
    }),
    tabBarOptions: {
      activeTintColor: '#aeeeff',
      inactiveTintColor: '#ffffff',
      style: {
        backgroundColor: '#70649B',
        // 565656
        // 4A4949
      },
    },
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
    state = {
      mapRegion: null,
      location: null,
      errorMessage: null,
    };
  
    componentWillMount() {
      if (Platform.OS === 'android' && !Constants.isDevice) {
        this.setState({
          errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
        });
      } else {
        this._getLocationAsync();
      }
    }
  
    _getLocationAsync = async () => {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== 'granted') {
        this.setState({
          errorMessage: 'Permission to access location was denied',
        });
      }
  
      let location = await Location.getCurrentPositionAsync({});
      this.setState({ location: location });
      this.setState({mapRegion: { latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }});
    };
  
    render() {
      let text = 'Waiting..';
      if (this.state.errorMessage) {
        text = this.state.errorMessage;
      } else if (this.state.location) {
        text = JSON.stringify(this.state.location);
      }
  
      return (
        
        <AppContainer />
        
      );
    }
  }
  

