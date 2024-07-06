// user.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { User } from './user.model';
import { loadUser, resetUser } from './actions';

export interface UserState {
  user: User;
}

export const initialState: UserState = {
  user: { id: -1, email: '', first_name: '', last_name: '', avatar: '' },
};

export const userReducer = createReducer(
  initialState,
  on(loadUser, (state, { user }) => ({ ...state, user })),
  on(resetUser, (state) => ({ ...state, user:  { id: -1, email: '', first_name: '', last_name: '', avatar: '' } }))
);
