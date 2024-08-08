import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, of, tap, throwError } from 'rxjs';
import {  UsersResponse, user } from '../interface/user.interface';
import { Store,select } from '@ngrx/store';
import { selectUserDetails, selectUsers } from '../store/user.selectors';
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient , private store: Store) { }

 
  private usersCache = new Map<number, Map<number, UsersResponse>>();
  private userDetailsCache = new Map<number, any>();
  private apiUrl = 'https://reqres.in/api/users';
  totalUsers = new BehaviorSubject<number>(0);


  getUsers(pageNumber: number, per_page: number = 6): Observable<UsersResponse> {

    console.log(per_page);
  
    if (this.usersCache.has(pageNumber)) {
      const perPageCache = this.usersCache.get(pageNumber);
      if (perPageCache && perPageCache.has(per_page)) {
        console.log(`Retrieving data for page ${pageNumber} and per_page ${per_page} from cache`);
        return of(perPageCache.get(per_page) as UsersResponse);
      }
    } else {
      this.usersCache.set(pageNumber, new Map<number, UsersResponse>());
    }
  
    return this.http.get<UsersResponse>(`${this.apiUrl}?page=${pageNumber}&per_page=${per_page}`)
      .pipe(
        tap(data => {
          const perPageCache = this.usersCache.get(pageNumber);
          if (perPageCache) {
            perPageCache.set(per_page, data);
          }
          console.log(`Data for page ${pageNumber} and per_page ${per_page} has been cached`);
        }),
        catchError(this.handleError)
      );
  }



  selectAllUsers() :Observable<UsersResponse>{
    return this.store.select(selectUsers)
  }
  


  
  getUserDetails(id:number): Observable <{data:user}>
  {

    if (this.userDetailsCache.has(id)){
      console.log(`Retrieving user details for user ${id} from cache`);
      return of(this.userDetailsCache.get(id));
    }else{
      return this.http.get<{data:user}>(`${this.apiUrl}/${id}`)
      .pipe(

        tap(
          data=>{
            this.userDetailsCache.set(id, data);
            console.log(`User details for user ${id} have been cached`);
          }
        ),
        catchError(this.handleError)
      );;

    }
   

  }
  selectUserDetails(): Observable<user | null> {
    return this.store.select(selectUserDetails)
  }

  
  private handleError(error: HttpErrorResponse) {
  
    if (error.error ) {
    
      console.error('An error occurred:', error.error.message);
    } else {
   
      console.error(`body was: ${error.error.message}`);
    }
   
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
