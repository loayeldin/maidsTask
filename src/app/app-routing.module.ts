import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AllUsersComponent } from './admin/all-users/all-users.component';
import { UserDetailsComponent } from './admin/user-details/user-details.component';

const routes: Routes = [


  {path:'', redirectTo:'admin' , pathMatch:"full"},
  { path: '**', redirectTo: 'admin' },
  {path:'admin',
  loadChildren:()=> import('./admin/admin.module')
  .then(m=>m.AdminModule)},


  



];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],


  exports: [RouterModule]
})
export class AppRoutingModule {




  
 }
