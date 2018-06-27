import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { composeWithDevTools } from 'remote-redux-devtools';
import Reactotron from 'reactotron-react-native'
import charitiesReducer from './reducers/charitiesReducer.js';
import store from './store'
import Calculator from './components/Calculator.js'





const composeEnhancers = composeWithDevTools({ realtime: true });
 



const officialStore = createStore(charitiesReducer, store, composeEnhancers())





export default class App extends React.Component {

  componentDidMount() {
    
  }

  render() {
 
    return (

      <View style={styles.container}>
       <Provider store={officialStore}>

       <Calculator />
      
       </Provider>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

