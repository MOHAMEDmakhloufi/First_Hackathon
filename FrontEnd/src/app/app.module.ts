import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { ChatService } from './services/chat.service';
import { ProfileService } from './services/Profile.service';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './user/user.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SettingComponent } from './setting/setting.component';

const appRoutes: Routes =[
  { path : 'welcome/signup', component: SignupComponent, canActivate:[AuthGuardService] },
  { path : 'welcome/signin', component: SigninComponent, canActivate:[AuthGuardService] },
  { path : 'welcome', component:  WelcomeComponent, canActivate:[AuthGuardService] },
  { path : 'users', component:  UsersComponent },
  { path : 'users/:id', component:  UserComponent },
  { path : 'setting', component:  SettingComponent },
  { path : 'sidebar', component:  SidebarComponent },
  { path : 'profile', component:  ProfileComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    HeaderComponent,
    WelcomeComponent,
    ProfileComponent,
    UsersComponent,
    UserComponent,
    SidebarComponent,
    SettingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AuthService,
    AuthGuardService,
    ProfileService,
    ChatService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
