import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Text, View, ScrollView, StyleSheet, FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Dimensions } from 'react-native';

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

const StackNavigator = createStackNavigator(
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

const AppNavigator = createBottomTabNavigator(
  {
    Home: StackNavigator, // { screen: EventList }
    Create: { screen: AddEvent }
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
  render() {
    return <AppContainer />;
  }
};

