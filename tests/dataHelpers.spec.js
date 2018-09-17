import store from '../store.js';
import * as dataHelper from '../utils/dataHelpers.js';
import deepcopy from 'deepcopy';




describe('Testing updateCharityText', () => {

      it('should return a copy of charity with updated text for relevant price point', () => {

        const charityId = 'dmi';
        const charities = deepcopy(store['charities'])
        charities[1]['pricePoints'][1]['text']['single'] = 'a'
        charities[1]['pricePoints'][1]['text']['plural'] = 'b'
        actualResult = dataHelper.updateCharityText(charityId, charities)
        expectedResult = store['charities'][1]
        expect(actualResult).toEqual(expectedResult)

      })




})


describe('Testing updateCharity', () => {

  it('should return null when an invalid charity id is given', () => {

    const expectedResult = null;
    const actualResult = dataHelper.updateCharityField(5555555, store['charities'], 'logo', 'bad')
    expect(actualResult).toEqual(expectedResult) 



  })

  it('update Charity when given a valid charity id should return an updated copy, without mutating original', () => {

    const charityTestId = 'amf';
    let testStore = deepcopy(store);
    actualResult = dataHelper.updateCharityField(charityTestId, testStore['charities'], 'logo', 'bad')
    expectedResult = deepcopy(store['charities'][0])
    expectedResult['logo'] = 'bad'
    expect(actualResult).toEqual(expectedResult)
    expect(testStore).toEqual(store)
  })

} )


describe('Testing getCharityNames', () => {
  it('should return an empty list when given an empty charity array', () => {
    const testObject = [];
    const expectedResult = [];
    const actualResult = dataHelper.getCharityNames(testObject);
    expect(expectedResult).toEqual(actualResult);
  });

  it('charities in store should return prop list of names', () => {
    const expectedResult = [
      'Against Malaria Foundation',

      'Development Media International',

      'Evidence Action',

      'Fistula Foundation',

      'Fred Hollows Foundation',

      'GiveDirectly',

      'Global Alliance for Improved Nutrition',

      'Innovations for Poverty Action',

      'Iodine Global Network',

      'Living Goods',

      'One Acre Fund',

      'Oxfam',

      'Population Services International',

      'Possible',

      'Project Healthy Children',

      'Schistosomiasis Control Initiative',

      'Seva'
    ];

    const actualResult = dataHelper.getCharityNames(store.charities);

    expect(actualResult).toEqual(expectedResult);
  });
});

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

    testCreateItemString(
      testValues[i].charity,
      testValues[i].index,
      testValues[i].dollars,
      dataHelper.createItemString,
      expectedResults[i]
    );
  }
});
