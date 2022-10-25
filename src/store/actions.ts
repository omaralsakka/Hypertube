export const SET_LANGUAGE = 'SET_LANGUAGE';

export type ActionTypes = { type: typeof SET_LANGUAGE; payload: string };

export const setLanguage = (language: string): ActionTypes => ({
	type: SET_LANGUAGE,
	payload: language,
});
