import { createSelector } from '@ngrx/store';
import { UserState } from '../interface/user.interface'; 

export const selectUserState = (state: any) => state.user;

export const selectUsers = createSelector(
  selectUserState,
  (state: UserState) => state.usersResponse 
);

export const selectUserDetails = createSelector(
  selectUserState,
  (state: UserState) => state.userDetails 
);





