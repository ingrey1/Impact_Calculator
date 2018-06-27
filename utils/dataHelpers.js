


/*

	returns an array of charity names. If charities or undefined or empty, returns an empty array

*/

export const getCharityNames = (charities) => {
	
	if (charities) {

		charities.map(charity => {

			return charity.name


		})


	} else return [];

}


export const calculateItemQuantity = (itemCost, dollarAmount, overhead) => {

		return Math.floor((dollarAmount - overhead) / itemCost);  

}

