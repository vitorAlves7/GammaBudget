import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserActions, UserActionTypes } from './../actions/user';
import { User, buildEmpty } from './../models/user.interface';

export interface State {
    user: User;
    isLogged: boolean;
    loading: boolean;
    error: any;
}

const initialState: State = {
    user: buildEmpty(),
    isLogged: false,
    loading: false,
    error: null,
};

export function reducer(
    state = initialState,
    action: UserActions,
): State {
    switch (action.type) {
        case UserActionTypes.Login:
            return {
                ...state,
                loading: true,
            }
        case UserActionTypes.Logout:
            return {
                ...state,
                loading: true,
            };
        case UserActionTypes.LoginSuccess:
            return {
                ...state,
                user: action.payload,
                isLogged: true,
                loading: false,
            };
        case UserActionTypes.LogoutSuccess:
            return {
                ...state,
                loading: false,
                user: buildEmpty(),
                isLogged: false,
                error: null,
            };
        case UserActionTypes.LoginFail:
            return {
                ...state,
                user: buildEmpty(),
                isLogged: false,
                loading: false,
                error: action.payload,
            };
        case UserActionTypes.LogoutFail:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default: {
            return state;
        }
    }
}

export const getUserState = createFeatureSelector<State>('user');

export const getUser = (state: State) => state.user;

export const userIsAuthenticated = (state: State) => state.isLogged;

export const getLoading = (state: State) => state.loading;

export const getStateError = (state: State) => state.error;

export const isLoading = createSelector(
    getUserState,
    getUser,
    getLoading
);

export const getError = createSelector(
    getUserState,
    getStateError,
);