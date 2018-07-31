import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import Calculator from './Calculator.js';
import AppNavButton from './AppNavButton.js';

const CalculatorStack = createStackNavigator({
  Calculator: {
    screen: ( () => <Calculator currentView="calculator" />),
    navigationOptions: ({ navigation }) => ({
      headerLeft: <AppNavButton toggle={navigation.toggleDrawer} />
    })
  }
});

const NewsLetterStack = createStackNavigator({
  Calculator: {
    screen: ( () => <Calculator currentView="newsletter" />),
    navigationOptions: ({ navigation }) => ({
      headerLeft: <AppNavButton toggle={navigation.toggleDrawer} />
    })
  }
});

const EffectiveGivingStack = createStackNavigator({
  Calculator: {
    screen: ( () => <Calculator currentView="effective giving" />),
    navigationOptions: ({ navigation }) => ({
      headerLeft: <AppNavButton toggle={navigation.toggleDrawer} />
    })
  }
});

const Navigation = createDrawerNavigator({
  CalculatorStack: {
    screen: CalculatorStack,
    navigationOptions: {
      drawerLabel: 'Impact Calculator'
    }
  },

  NewsLetterStack: {
    screen: NewsLetterStack,
    navigationOptions: {
      drawerLabel: 'Subscribe To Our Newsletter'
    }
  },

  EffectiveGivingStack: {
    screen: EffectiveGivingStack,
    navigationOptions: {
      drawerLabel: 'Learn More About Effective Giving'
    }
  }
});

export default Navigation;
