import store from '../store.js';
import {updateCharityText} from '../dataHelpers.js'
import { POPULATE_CHARITIES, UPDATE_CHARITY } from '../constants/index.js';


function charitiesReducer(state = store['charities'], action) {
  switch (action.type) {
    case POPULATE_CHARITIES:
      return action.charities;
    case UPDATE_CHARITY_TEXT:

    	return {...state, 'charities': ...state['charities'].map( charity => {


    			if (charity.id === action.charityId) return updateCharitytext(action.charityId, state) 
    			else return charity		

    	})

    	}
    	



    default:
      return state;
  }
}

export default charitiesReducer;
