import { Component, ElementRef, Renderer2 } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { AdminService } from '../admin-service/admin.service';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { UsersResponse } from '../interface/user.interface';
import { Store, select } from '@ngrx/store';
import { selectUsers  } from '../store/user.selectors'; // Update with correct path
import { loadUsers } from '../store/user.actions';
@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss']
})
export class AllUsersComponent  {

 
  searchId!: number ;
  users$!: Observable<any>;

  totalLength !:number; 
  totalPages !:number
  
  pageSizeOptions !:any; 
  pageSize  !:number ; 
  constructor(private adminService:AdminService,private router:Router,private renderer: Renderer2,private el:ElementRef,private store: Store){
    this.users$ = this.store.pipe(select(selectUsers));
     

  }
  pageNumber = 1

  usersData !:UsersResponse
  isLoading = true
  usersSubscription: Subscription = new Subscription();
  usersView!:string | null
  ngOnInit(){
    if (localStorage.getItem("usersView")) {

   
      
      this.usersView = localStorage.getItem("usersView");
      console.log(typeof(this.usersView));
    
      if (this.usersView === "tableView") {
        this.tableView();

      } else if (this.usersView === "cardView") {
       
        this.cardView();
      }
    }


   
    this.store.dispatch(loadUsers({ pageNumber: 1, per_page: 6 }));
    

    this.usersSubscription.add(
      this.adminService.selectAllUsers().subscribe(data=>{
        this.usersData= data!
        console.log(this.usersData);
        this.pageSize = this.usersData.per_page;
            this.totalLength = this.usersData.total;
            this.totalPages = this.usersData.total_pages;
    
            this.adminService.totalUsers.next(this.totalLength)
  
            console.log(this.pageSize);
            
      
            // make 4 options only for pageSizeOptions depend on total users length
            if (this.totalLength > 0) {
              const increment = Math.ceil(this.totalLength / 4);
              this.pageSizeOptions = [increment, 2 * increment, 3 * increment, 4 * increment];
            }
            this.isLoading = false;
        
      })
    )




    
  }

 

  onPageChange(event: PageEvent) {
    console.log(event);
    
    console.log(event.pageSize);
    
    
    this.pageSize = event.pageSize;
    this.pageNumber = event.pageIndex + 1;
    console.log(this.pageSize);


   

    this.store.dispatch(loadUsers({ pageNumber: this.pageNumber, per_page: this.pageSize }));
    

   
  }

  openUserDetails(id:number){
    
    this.router.navigate(['admin/allusers',id])
    
  }

  tableView(){

   

    const tableIconbg = this.el.nativeElement.querySelector('.table-icon')
    const cardsIconbg = this.el.nativeElement.querySelector('.cards-icon')
    this.renderer.setStyle(tableIconbg, 'background-color', 'var(--main-color)');
    this.renderer.setStyle(cardsIconbg, 'background-color', 'white');



    const tableIconColor = this.el.nativeElement.querySelector('.table-icon svg path')
    const cardsIconColor = this.el.nativeElement.querySelector('.cards-icon svg path')

    this.renderer.setStyle(tableIconColor, 'fill', 'white');
    this.renderer.setStyle(cardsIconColor, 'fill', 'var(--main-color)');

    
 
    const table = this.el.nativeElement.querySelector('.table-container')
    this.renderer.setStyle(table, 'display', 'block');
     

    const card = this.el.nativeElement.querySelector('.card-container')

    this.renderer.setStyle(card, 'display', 'none');

    localStorage.setItem("usersView", "tableView")

  }

  cardView(){

    const tableIconbg = this.el.nativeElement.querySelector('.table-icon')
    const cardsIconbg = this.el.nativeElement.querySelector('.cards-icon')

      
    this.renderer.setStyle(tableIconbg, 'background-color', 'white');
    this.renderer.setStyle(cardsIconbg, 'background-color', 'var(--main-color)');







    const tableIconColor = this.el.nativeElement.querySelector('.table-icon svg path')
    const cardsIconColor = this.el.nativeElement.querySelector('.cards-icon svg path')

    this.renderer.setStyle(tableIconColor, 'fill', 'var(--main-color)');
    this.renderer.setStyle(cardsIconColor, 'fill', 'white');
  



    const card = this.el.nativeElement.querySelector('.card-container')

    this.renderer.setStyle(card, 'display', 'block');
  
    const table = this.el.nativeElement.querySelector('.table-container')

    
    this.renderer.setStyle(table, 'display', 'none');
  
    localStorage.setItem("usersView", "cardView")
    }

  ngOnDestroy(){
    this.usersSubscription.unsubscribe()
  }

}
