import { combineReducers } from 'redux';

import items from './item';

const rootReducer = combineReducers({
	items,
});

export default rootReducer;
