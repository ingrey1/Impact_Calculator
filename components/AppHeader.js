import React, { Component } from 'react';
import { Text, View } from 'react-native';

const styles = {
  justifyContent: 'right'
};

class AppHeader extends Component {
  render() {
    return (
      <View style={styles}>
        <Text>App Header</Text>
      </View>
    );
  }
}

export default AppHeader;
