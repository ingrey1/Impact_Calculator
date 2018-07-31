import React, { Component } from 'react';
import { Text, View, TextInput, Stylesheet } from 'react-native';
import { connect } from 'react-redux';
import { Input, Icon, Button } from 'react-native-elements';
import ModalDropdown from 'react-native-modal-dropdown';
import CalculatorResults from './CalculatorResults';
import {
  getCharityNames,
  createItemString,
  getItemStrings,
  getCharityByName
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

  render() {
    return (
      <View style={containerStyles}>
        <TextInput
          value={this.state.amount}
          onChangeText={newValue => this.setState({ amount: newValue })}
          style={inputStyles}
          keyboardType="numeric"
          placeholder=" $ AMOUNT"
        />

        <ModalDropdown
          onSelect={index =>
            this.setState(state => { 

              return {
              ...state,
              selectedCharity: this.state.charities[index],
              results: 'none'
              }

               })
          }
          showsVerticalScrollIndicator={true}
          style={dropDownContainerStyles}
          textStyle={dropDownTextStyles}
          options={this.state.charities}
        >
          <View style={{ flexDirection: 'row' }}>
            <Text
              style={{
                fontSize: 20,

                marginRight: 10
              }}
            >
              {this.state.selectedCharity || 'Select A Charity...'}
            </Text>
            <Icon name="md-arrow-dropdown-circle" type="ionicon" />
          </View>
        </ModalDropdown>

        <Button
          onPress={() => {
            const currentAmount = Number(this.state.amount)

            if (this.state.selectedCharity !== null && (typeof(currentAmount) === 'number') && currentAmount > 0) {

             
              this.setState({results: 
                getItemStrings(getCharityByName(
                    this.state.selectedCharity,
                    this.props.store.charities
                  ), currentAmount)
              })



              
             

                  
            
          



          }
          }}
          color="white"
          buttonStyle={{ backgroundColor: '#32CD32' }}
          title="See Impact"
        />
       
        <Text>{typeof(this.state.results) === 'string' ? '' : this.state.results.filter(result => result !== null).map((result, index) => {



            if (index < this.state.results.length - 1) {

              const charity = getCharityByName(
                    this.state.selectedCharity,
                    this.props.store.charities
                  )  

              return result + " \n\n" + charity.pricePoints[1].joiner + "\n\n"

            } else return result


        })}</Text>
      </View>
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
