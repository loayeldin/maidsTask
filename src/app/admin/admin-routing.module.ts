import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AdminComponent } from "./admin.component";
import { UserDetailsComponent } from "./user-details/user-details.component";
import { AllUsersComponent } from "./all-users/all-users.component";

const routes: Routes = [
    {
        path:'',component:AdminComponent,children:[
          {path:'', redirectTo:'allusers', pathMatch:"full"},
          {path:'allusers',component:AllUsersComponent},
          {path:'allusers/:id', component:UserDetailsComponent}
        ]
      }
  ];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports:[RouterModule]
})

export class AdminRoutingModule{}