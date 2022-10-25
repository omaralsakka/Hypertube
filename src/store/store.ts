import { ActionTypes, SET_LANGUAGE } from './actions';
import { Store } from './types';
import { configureStore } from '@reduxjs/toolkit';

const languageReducer = (
	state: Store = { Language: 'en' },
	action: ActionTypes
) => {
	switch (action.type) {
		case SET_LANGUAGE:
			return {
				...state,
				Language: action.payload,
			};
		default:
			return state;
	}
};

const store = configureStore({
	reducer: languageReducer,
});

export default store;
