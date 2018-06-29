/*

	returns an array of charity names. If charities or undefined or empty, returns an empty array

*/

export const getCharityNames = charities => {
  if (charities) {
    charities.map(charity => {
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
      dollarAmount,
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
