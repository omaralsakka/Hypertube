import { Movies } from '../types/appTypes';
import { UserState } from './types';

export const SET_LANGUAGE = 'SET_LANGUAGE';
export const SET_USER = 'SET_USER';
export const SET_MOVIES = 'SET_MOVIES';

export type LanguageActionType = { type: typeof SET_LANGUAGE; payload: string };
export type UserActionType = { type: typeof SET_USER; payload: UserState };
export type MoviesActionType = { type: typeof SET_MOVIES; payload: Movies };

export const setLanguage = (language: string): LanguageActionType => ({
	type: SET_LANGUAGE,
	payload: language,
});

export const setUser = (userInfo: UserState): UserActionType => ({
	type: SET_USER,
	payload: userInfo,
});

export const setMovies = (movies: Movies): MoviesActionType => ({
	type: SET_MOVIES,
	payload: movies,
});
