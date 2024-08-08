import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AdminService } from '../admin-service/admin.service'; 
import { loadUsers, loadUsersSuccess, loadUsersFailure , loadUserDetails,loadUserDetailsSuccess,loadUserDetailsFailure } from './user.actions';

@Injectable()
export class UserEffects {


    constructor(private actions$: Actions, private adminSerivce: AdminService) {}




    loadUsers$ = createEffect(() =>
      this.actions$.pipe(
        ofType(loadUsers),
        switchMap(({ pageNumber, per_page }) =>
          this.adminSerivce.getUsers(pageNumber, per_page).pipe(
            map(usersResponse => loadUsersSuccess({ usersResponse})), 
            catchError(error => of(loadUsersFailure({ error })))
          )
        )
      )
    );




    loadUserDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUserDetails),
      switchMap(action =>
        this.adminSerivce.getUserDetails(action.id).pipe(
          map(response => loadUserDetailsSuccess({ userDetails: response.data })),
          catchError(error => of(loadUserDetailsFailure({ error })))
        )
      )
    )
  );
  
  
  }
