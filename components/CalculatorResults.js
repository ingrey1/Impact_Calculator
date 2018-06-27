import React, {Component} from 'react'
import {View, Text} from 'react-native'





const CalculatorResults = (props) => {


	return (

		<View>

		{props.results && props.results.length > 0 && (

			<Text>results</Text>

			) } 

		</View>

		)


}

export default CalculatorResults