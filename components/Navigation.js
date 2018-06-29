import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import Calculator from './Calculator.js';
import AppHeader from './AppHeader.js';

const Menu = createDrawerNavigator(
  {
    Menu: {
      screen: Calculator,
      navigationOptions: {
        drawerLabel: 'Calculator'
      }
    },
    NewsLetterLink: {
      screen: Calculator,
      navigationOptions: {
        drawerLabel: 'News Letter'
      }
    },
    EffectGivingLink: {
      screen: Calculator,
      navigationOptions: {
        drawerLabel: 'Give More'
      }
    }
  },
  {
    drawerPosition: 'left',
    drawerBackgroundColor: 'red'
  }
);

const Navigation = createStackNavigator(
  {
    Menu: { screen: Menu }
  },
  {
    initialRouteName: 'Menu',

    navigationOptions: {
       title: 'The Life You Can Save',	
      headerLeft: AppHeader,
      mode: 'card'
    }
  }
);

export default Navigation;
