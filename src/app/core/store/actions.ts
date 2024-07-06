// user.actions.ts
import { createAction, props } from '@ngrx/store';
import { User } from './user.model';

export const loadUser = createAction('[User] Load User', props<{ user: User }>());
export const resetUser = createAction('[User] Reset User');
