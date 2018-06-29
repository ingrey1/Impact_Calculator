import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { composeWithDevTools } from 'remote-redux-devtools';
import charitiesReducer from './reducers/charitiesReducer.js';
import store from './store';
import Navigation from './components/Navigation.js';

const composeEnhancers = composeWithDevTools({ realtime: true });

const officialStore = createStore(charitiesReducer, store, composeEnhancers());

export default class App extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <View style={styles.container}>
        <Provider store={officialStore}>
          <Navigation />
        </Provider>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center'
  }
});
