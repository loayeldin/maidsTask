import { createAction, props } from '@ngrx/store';
import { UsersResponse, user } from '../interface/user.interface'; 

export const loadUsers = createAction(
  '[User] Load Users',
  props<{ pageNumber: number; per_page: number }>()
);

export const loadUsersSuccess = createAction(
  '[User] Load Users Success',
  props<{ usersResponse:UsersResponse  }>()
);




export const loadUsersFailure = createAction(
  '[User] Load Users Failure',
  props<{ error: any }>()
);


export const loadUserDetails = createAction(
    '[User] Load User Details',
    props<{ id: number }>()
  );
  
  export const loadUserDetailsSuccess = createAction(
    '[User] Load User Details Success',
    props<{ userDetails: user }>()
  );
  
  export const loadUserDetailsFailure = createAction(
    '[User] Load User Details Failure',
    props<{ error: any }>()
  );