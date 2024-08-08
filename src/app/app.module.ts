import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { userReducer } from './admin/store/user.reducer';
import { UserEffects } from './admin/store/user.effects';

@NgModule({
  declarations: [
    AppComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,

    StoreModule.forRoot({ user: userReducer }),
    EffectsModule.forRoot([UserEffects]),

    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() })
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
