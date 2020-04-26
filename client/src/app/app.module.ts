import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MainComponent } from './main/main.component';
import { ProfileComponent } from './profile/profile.component';
import { WorkspaceComponent } from './workspace/workspace.component';
import { AddWorkspaceComponent } from './add-workspace/add-workspace.component';
import { AddPeopleComponent } from './workspace/add-people/add-people.component';
import { UpdateProfileComponent } from './profile/update-profile/update-profile.component';
import { TokenInterceptor } from './shared/auth.interceptor';
import { ProfileItemComponent } from './profile/profile-item/profile-item.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    NavbarComponent,
    MainComponent,
    ProfileComponent,
    WorkspaceComponent,
    AddWorkspaceComponent,
    AddPeopleComponent,
    UpdateProfileComponent,
    ProfileItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor
      }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
