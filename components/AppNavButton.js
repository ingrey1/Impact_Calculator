import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Foundation } from '@expo/vector-icons';

const viewStyles = {
  flexDirection: 'row',
  marginLeft: 5
};

const textStyles = {
  fontSize: 24,
  marginLeft: 5
};

class AppNavButton extends Component {
  render() {
    return (
      <View style={viewStyles}>
        <TouchableOpacity onPress={() => this.props.toggle()}>
          <Foundation name="list" size={32} color="black" />
        </TouchableOpacity>
        <Text style={textStyles}>The Life You Can Save</Text>
      </View>
    );
  }
}

export default AppNavButton;
