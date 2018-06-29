import store from '../store.js';
import { POPULATE_CHARITIES } from '../constants/index.js';

function charitiesReducer(state = store['charities'], action) {
  switch (action.type) {
    case POPULATE_CHARITIES:
      return action.charities;
    default:
      return state;
  }
}

export default charitiesReducer;
