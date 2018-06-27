import React, {Component} from 'react'
import {Text, View, TextInput, Stylesheet} from 'react-native'
import {connect} from 'react-redux'
import {Input} from 'react-native-elements'
import ModalDropdown from 'react-native-modal-dropdown'
import NumericInput from 'react-native-numeric-input'
import CalculatorResults from './CalculatorResults'
import {getCharityNames} from "../utils/dataHelpers"


const inputStyles = {
	height: 40,
	width: 100,
	borderWidth: 1,
	borderColor: 'black',
	
}


class Calculator extends Component {


	state = {

		amount: 0,
		selectedCharity: null,
		results: null 
	}


	render() {


		return (

			<View>

			<NumericInput totalWidth={200} value={this.state.amount} valueType='real' rounded step={1} type='up-down' onChange={value => this.setState({amount: value})} />
			<ModalDropdown options={['option1']} />	

			<CalculatorResults results={this.state.results} />


			</View>


			)


	}






}

const mapStateToProps = (state) => {
	return {
		store: state
	}
}

const mapDispatchToProps = (dispatch) => {

	return {


	}

}


export default connect(mapStateToProps, mapDispatchToProps)(Calculator)
