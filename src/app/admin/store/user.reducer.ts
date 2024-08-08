import { createReducer, on } from '@ngrx/store';
import { loadUsers, loadUsersSuccess, loadUsersFailure, loadUserDetails, loadUserDetailsSuccess } from './user.actions';
import { UsersResponse, initialState, user } from '../interface/user.interface'; 



export const userReducer = createReducer(
  initialState,
  on(loadUsers, state => ({ ...state, loading: true })),
  
  on(loadUsersSuccess, (state, { usersResponse }) => ({
    ...state,
     usersResponse,
    loading: false
  })),
  on(loadUserDetails, state => ({ ...state, loading: true })),
  
  on(loadUserDetailsSuccess, (state, { userDetails }) => ({
    ...state,
    userDetails,
    loading: false
  })),
  
  
  
  
  
  
  );
