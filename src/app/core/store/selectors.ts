// user.selectors.ts
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { UserState } from './reducer';

export const selectUserState = createFeatureSelector<UserState>('user');

export const selectUser = createSelector(selectUserState, (state: UserState) => state.user);
