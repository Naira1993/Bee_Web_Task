import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ProfileComponent } from './profile/profile.component';
import { AddWorkspaceComponent } from './add-workspace/add-workspace.component';
import { WorkspaceComponent } from './workspace/workspace.component';
import { AddPeopleComponent } from './workspace/add-people/add-people.component';
import { AuthGuard } from './shared/auth.guard';
import { UpdateProfileComponent } from './profile/update-profile/update-profile.component';
import { ProfileItemComponent } from './profile/profile-item/profile-item.component';


const routes: Routes = [
  { path: '', component: ProfileComponent , canActivate: [AuthGuard]},
  { path: 'registration', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  { path: 'update/:email', component: UpdateProfileComponent, canActivate: [AuthGuard]},
  { path: 'add-workspace', component: AddWorkspaceComponent, canActivate: [AuthGuard]},
  {
    path: 'workspace/:id', component: WorkspaceComponent,
    children: [
      { path: '', component: ProfileItemComponent },
      {path: 'add/:id', component: AddPeopleComponent},


    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
