import deepcopy from 'deepcopy'
import store from '../store.js'


export const updateCharityText = (charityId, charities) => {

  /* Returns a copy of the charity with text changed for that charity if a text change is needed for that charity */


    const charity = getCharityById(charityId, charities)



    if (charity !== null) {

    let copiedCharity = deepcopy(charity)  

    switch(charityId) {

      case 'dmi':

        copiedCharity['pricePoints'][1]['text'] = {
            single:
              'Save the life of someone who would otherwise have died from preventable diseases, according to DMIA\'s latest mathematical modeling.',
            plural:
              'Save * lives of those who would otherwise have died from preventable diseases, according to DMIA\'s mathematical modeling.'
          }

      break;
      
      case 'fistula-foundation':

         copiedCharity['pricePoints'][3]['text'] = {
            single:
              "Fund a complete surgery and postoperative care to safely repair a woman's obstetric fistula.",
            plural:
              "Fund complete surgeries and postoperative care to safely repair womens' obstetric fistulas."
          }

         break;
         

    } // end switch


    return copiedCharity


  } // end if

  return null; // there is no updated copy of a charity returned

} // end function





 /*

    Returns a copy of the charity with an updated value for the updateField.

  */


export const updateCharityField = (charityId, charities, updateField, updateValue) => {

 

        let charity;
        for (let i = 0; i < charities.length; i++) {
          if (charities[i].id === charityId) charity = charities[i]
        }

        if (charity) {


          let charityCopy = {...charity,

                     [updateField]: updateValue   
          }

          return charityCopy




        } else return null



}



/*

  returns an array of charity names. If charities or undefined or empty, returns an empty array

*/

export const getCharityNames = charities => {
  if (charities && Array.isArray(charities) && charities.length > 0) {
    return charities.map(charity => {
      return charity.name;
    });
  } else return [];
};

export const validQuantity = quantity => {
  if (quantity !== null && !isNaN(quantity)) {
    return quantity >= 0;
  } else return false;
};

export const calculateItemQuantity = (itemCost, dollarAmount, overhead) => {
  if (
    validQuantity(itemCost) &&
    itemCost > 0 &&
    validQuantity(dollarAmount) &&
    validQuantity(overhead)
  ) {
    return Math.floor((dollarAmount - overhead * dollarAmount) / itemCost);
  } else return null;
};

export const createItemString = (charity, itemIndex, dollarAmount) => {
  const validIndex = charity
    ? itemIndex >= 0 && itemIndex < charity.pricePoints.length
    : false;

  if (charity && charity !== null && validIndex) {
    const item = charity.pricePoints[itemIndex];

    const quantity = calculateItemQuantity(
      item.price,
      typeof dollarAmount === 'string' ? Number(dollarAmount) : dollarAmount,
      charity.overhead
    );

    let itemString = null;

    if (quantity > 0) {
      itemString =
        quantity > 1
          ? item.text.plural.replace('*', quantity)
          : item.text.single;
    }

    return itemString;
  } else return null;
};

export const getItemStrings = (charity, dollarAmount) => {
  if (
    charity !== null &&
    typeof dollarAmount === 'number' &&
    dollarAmount > 0
  ) {
    return charity.pricePoints.map((pricePoint, index) => {
      return createItemString(charity, index, dollarAmount);
    });
  }
  return null;
};

export const getCharityByName = (charityName, charities) => {
  for (let i = 0; i < charities.length; i++) {
    if (charities[i].name == charityName) return charities[i];
  }
  return null;
};

export const getCharityById = (charityId, charities) => {
  for (let i = 0; i < charities.length; i++) {
    if (charities[i].id == charityId) return charities[i];
  }
  return null;
};

export const displayCharityResults = (initialResults, charity) => {
  /*
  this.state.results
                  .filter(result => result !== null)
                  .map((result, index) => {
                    if (index < this.length - 1) {
                      const charity = getCharityByName(
                        this.state.selectedCharity,
                        this.props.store.charities
                      );

                      return (
                        result +
                        ' \n\n' +
                        charity.pricePoints[1].joiner +
                        '\n\n'
                      );
                    } else return result;
                  })


*/

  const filteredResults = initialResults.filter(result => result !== null);

  return filteredResults.map((result, index) => {
    if (index < filteredResults.length - 1)
      return result + ' \n\n' + charity.pricePoints[1].joiner + '\n\n';
    else return result;
  });
};
