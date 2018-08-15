import React, { Component } from 'react';
import {
  Text,
  View,
  Linking,
  ScrollView,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  Stylesheet
} from 'react-native';
import { connect } from 'react-redux';
import { Input, Icon, Button } from 'react-native-elements';
import { Dropdown } from 'react-native-material-dropdown';
import CalculatorResults from './CalculatorResults';
import {
  getCharityNames,
  createItemString,
  getItemStrings,
  getCharityByName,
  displayCharityResults
} from '../utils/dataHelpers';

const inputStyles = {
  height: 40,
  width: '60%',
  borderWidth: 1,
  borderColor: 'black',
  marginRight: 10,
  marginTop: 10,
  marginBottom: 10
};

const containerStyles = {
  marginTop: 50,
  marginLeft: 50,
  flexDirection: 'column'
};

const dropDownTextStyles = {
  fontSize: 20
};

const dropDownContainerStyles = {
  borderWidth: 1,
  borderColor: 'black',
  width: '60%'
};

class Calculator extends Component {
  state = {
    amount: '',
    charities: getCharityNames(this.props.store.charities) || [],
    selectedCharity: null,
    results: 'none'
  };

  componentDidMount() {
    if (this.props.currentView === 'newsletter')
      Linking.openURL('https://www.thelifeyoucansave.org/newsletter');
    else if (this.props.currentView === 'effective giving')
      Linking.openURL('https://www.thelifeyoucansave.org/learn-more');
  }

  render() {
    return (
      <TouchableWithoutFeedback accessible={false} onPress={Keyboard.dismiss}>
        <ScrollView style={containerStyles}>
          <TextInput
            value={this.state.amount}
            onChangeText={newValue => this.setState({ amount: newValue })}
            style={inputStyles}
            keyboardType="numeric"
            placeholder=" $ AMOUNT"
          />

          <Dropdown
            value={
              this.state.selectedCharity !== null
                ? this.state.selectedCharity
                : 'SELECT A CHARITY...'
            }
            data={this.state.charities.map(charity => {
              return {
                value: charity
              };
            })}
            onChangeText={(value, index, data) => {
              this.setState(state => {
                return {
                  ...state,
                  selectedCharity: value,
                  results: 'none'
                };
              });
            }}
          />

          <Button
            onPress={() => {
              const currentAmount = Number(this.state.amount);

              if (
                this.state.selectedCharity !== null &&
                typeof currentAmount === 'number' &&
                currentAmount > 0
              ) {
                this.setState({
                  results: getItemStrings(
                    getCharityByName(
                      this.state.selectedCharity,
                      this.props.store.charities
                    ),
                    currentAmount
                  )
                });
              }
            }}
            color="white"
            buttonStyle={{ backgroundColor: '#32CD32' }}
            title="See Impact"
          />

          <Text>
            {typeof this.state.results === 'string'
              ? ''
              : displayCharityResults(
                  this.state.results,
                  getCharityByName(
                    this.state.selectedCharity,
                    this.props.store.charities
                  )
                )}
          </Text>
        </ScrollView>
      </TouchableWithoutFeedback>
    );
  }
}

const mapStateToProps = state => {
  return {
    store: state
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Calculator);
