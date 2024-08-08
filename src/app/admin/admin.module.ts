import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { AdminComponent } from './admin.component';
import { AllUsersComponent } from './all-users/all-users.component';
import { ResizeNavDirective } from './directives/resize-nav.directive';
import { FilterByIdPipe } from './filters/filter-by-id.pipe';
import { UserDetailsComponent } from './user-details/user-details.component';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
    declarations: [
        AdminComponent,
        AllUsersComponent,
        UserDetailsComponent,
        FilterByIdPipe,
        LoadingSpinnerComponent,
        ResizeNavDirective
    ],
    imports: [
        CommonModule,
        MatPaginatorModule,
        HttpClientModule,
        FormsModule,
        AdminRoutingModule,
       
    ]
})
export class AdminModule {}