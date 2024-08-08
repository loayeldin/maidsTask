import { Component } from '@angular/core';
import { AdminService } from '../admin-service/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UsersResponse, user } from '../interface/user.interface';
import { Store } from '@ngrx/store';
import { loadUserDetails } from '../store/user.actions';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent {
  constructor(private adminService:AdminService,private route:ActivatedRoute,private router:Router,private store: Store){}
  userDetailsData!:user
  userId!:number
  isLoading = true

  loadingSubscription:Subscription = new Subscription()
  userSubscription: Subscription = new Subscription();
  routeSubscription : Subscription = new Subscription()
  ngOnInit(){

    this.routeSubscription.add(
      this.route.params.subscribe(params=>{
        this.userId = Number(params['id'])
        console.log(typeof(this.userId));
        
       })
    )
  
   
       this.loadingSubscription.add(
        this.adminService.isLoading.subscribe(data=>{
          this.isLoading = data
        })
       )

    this.store.dispatch(loadUserDetails({id:this.userId }));


      this.userSubscription.add(
        this.adminService.selectUserDetails().subscribe(data=>{
      
          this.userDetailsData = data!
    
          console.log(this.userDetailsData);
          this.isLoading = false
        })
      )
      
    
  }





  navigateBack(){
    this.router.navigate(['../'], { relativeTo: this.route });

  }

  ngOnDestroy(){
    this.userSubscription.unsubscribe()
    this.routeSubscription.unsubscribe()
    this.loadingSubscription.unsubscribe()
  }
  
}
