import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router} from '@angular/router';

import { MaterialService } from '../shared/material.service';
import { AuthService } from '../services/auth.service';
import { WorkspaceService } from '../services/workspace.service';
import { User, Workspace } from '../shared/interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy{

  email: string;
  user: User;
  sub: Subscription;
  workspaces: Workspace;

  constructor(private authService: AuthService,
    private workspaceService: WorkspaceService,
    private router: Router) { }

  ngOnInit(): void {
    this.email = localStorage.getItem('email')
    this.sub = this.authService.getUserByEmail(this.email).subscribe( res => {
      this.user = res.user;
      this.workspaceService.getAllByUser().subscribe(res => {
        this.workspaces = res.workspaces.filter(c => c.users.findIndex(i => i ===  this.email) !== -1 )
        console.log(this.workspaces);
        
      })
        
    })
  }

  ngOnDestroy() {
   this.sub.unsubscribe()
  }


  openModal(elem) {
    MaterialService.modal(elem).open()
  }


  logout() {
    this.authService.logout();
    this.router.navigate(['/login'])
  }


}
