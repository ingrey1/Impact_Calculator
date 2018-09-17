import { POPULATE_CHARITIES, UPDATE_CHARITY } from '../constants/index.js';

export const populateCharities = newCharities => {
  return {
    type: POPULATE_CHARITIES,
    charities: newCharities
  };
};

export const updateCharityText = charityId => {
  return {
    type: UPDATE_CHARITY_TEXT,
    charityId: charityId
  };
};
