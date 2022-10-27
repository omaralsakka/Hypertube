import {
	LanguageActionType,
	SET_LANGUAGE,
	SET_USER,
	UserActionType,
} from './actions';
import { LanguageState, UserState } from './types';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

const initialUserState: UserState = {
	userEmail: 'test@test.com',
	userName: 'Test Name',
	userId: '1test',
};

const languageReducer = (
	state: LanguageState = { Language: 'en' },
	action: LanguageActionType
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

const userReducer = (
	state: UserState = initialUserState,
	action: UserActionType
) => {
	switch (action.type) {
		case SET_USER:
			return {
				...state,
				userEmail: action.payload.userEmail,
				userName: action.payload.userName,
				userId: action.payload.userId,
			};
		default:
			return state;
	}
};

export const rootReducer = combineReducers({
	languageReducer,
	userReducer,
});

const store = configureStore({
	reducer: rootReducer,
});

export default store;
