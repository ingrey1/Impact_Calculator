import store from '../store.js';
import * as dataHelper from '../utils/dataHelpers.js';

const testQuantity = (testValue, testFunction, expectedResult) => {
  it(`${testValue} should return ${expectedResult}`, () => {
    expect(testFunction(testValue)).toEqual(expectedResult);
  });
};

const testCalculateItemQuantity = (
  price,
  dollars,
  overhead,
  testFunction,
  expectedQuantity
) => {
  it(`price: ${price}, overhead: ${overhead}, dollars: ${dollars} should return a quantity of ${expectedQuantity}`, () => {
    expect(testFunction(price, dollars, overhead)).toEqual(expectedQuantity);
  });
};

const testCreateItemString = (
  charity,
  itemIndex,
  dollarAmount,
  testFunction,
  expectedString
) => {
  it(`charity: ${
    charity ? charity.name : null
  }, price point item index: ${itemIndex}, dollars: ${dollarAmount} should return: ${expectedString}`, () => {
    expect(testFunction(charity, itemIndex, dollarAmount)).toEqual(
      expectedString
    );
  });
};

describe('Testing validQuantity', () => {
  const testValues = [-1, 0, 0.1, 50000, null, undefined, -500];
  const expectedResults = [false, true, true, true, false, false, false];
  for (let i = 0; i < testValues.length; i++) {
    testQuantity(testValues[i], dataHelper.validQuantity, expectedResults[i]);
  }
});

describe('Testing CalculateItemQuantity', () => {
  const testValues = [
    { price: 10, overhead: 0, dollars: 100 },
    { price: 10, overhead: 0.1, dollars: 100 },
    { price: null, overhead: 0.1, dollars: 100 },
    { price: undefined, overhead: 0.1, dollars: 100 },
    { price: 0, overhead: 0.1, dollars: 100 },
    { price: 10, overhead: null, dollars: 100 },
    { price: 100, overhead: 0, dollars: 99 },
    { price: 100, overhead: 0.1, dollars: 110 },
    { price: 100, overhead: 0.1, dollars: 112 },
    { price: 100, overhead: 0.1, dollars: 109 },
    { price: 25, overhead: 0.146, dollars: 100 }
  ];
  const expectedResults = [10, 9, null, null, null, null, 0, 0, 1, 0, 3];
  for (let i = 0; i < testValues.length; i++) {
    testCalculateItemQuantity(
      testValues[i].price,
      testValues[i].dollars,
      testValues[i].overhead,
      dataHelper.calculateItemQuantity,
      expectedResults[i]
    );
  }
});

describe('Testing createItemString', () => {
  const testValues = [
    { charity: null, index: 0, dollars: 100 },
    { charity: store.charities[0], index: 0, dollars: undefined },
    { charity: store.charities[0], index: 0, dollars: 1 },
    { charity: store.charities[0], index: 3, dollars: 5 },
    { charity: store.charities[0], index: 0, dollars: 2.5 },
    { charity: store.charities[0], index: 0, dollars: 3.5 },
    { charity: store.charities[0], index: 0, dollars: 5 },
    { charity: store.charities[0], index: 0, dollars: 103.49 }
  ];
  const expectedResults = [
    null,
    null,
    null,
    null,
    'Provide a bednet to protect those living in malaria-stricken areas from infected mosquitos.',
    'Provide a bednet to protect those living in malaria-stricken areas from infected mosquitos.',
    'Provide 2 bednets to protect those living in malaria-stricken areas from infected mosquitos.',
    'Provide 41 bednets to protect those living in malaria-stricken areas from infected mosquitos.'
  ];

  for (let i = 0; i < testValues.length; i++) {
    const validIndex = testValues[i].charity
      ? testValues[i].index >= 0 &&
        testValues[i].index < testValues[i].charity.pricePoints.length
      : false;
    if (i === 2) {
      console.log('validIndex: ', validIndex);
      console.log(
        'testing conditional: ',
        testValues[i].charity && testValues[i].charity !== null && validIndex
      );
    }

    testCreateItemString(
      testValues[i].charity,
      testValues[i].index,
      testValues[i].dollars,
      dataHelper.createItemString,
      expectedResults[i]
    );
  }
});