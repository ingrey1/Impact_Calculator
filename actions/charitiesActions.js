import { POPULATE_CHARITIES } from '../constants/index.js';

export const populateCharities = newCharities => {
  return {
    type: POPULATE_CHARITIES,
    charities: newCharities
  };
};
