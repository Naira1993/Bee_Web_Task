import { Component, OnInit } from '@angular/core';
import { WorkspaceService } from '../services/workspace.service';
import { Workspace } from '../shared/interface';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialService } from '../shared/material.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  workspace: Workspace;
  id: string;

  constructor(private workspaceService: WorkspaceService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    console.log(this.id);
    
    this.workspaceService.getById(this.id).subscribe(res => {
      this.workspace = res.workspace
    })
  }

  delete() {
  const email = localStorage.getItem('email')
    if(this.workspace.user_email === email) {
      this.workspaceService.delete(this.id).subscribe()
      this.router.navigate(['/profile']);
    } else {
      MaterialService.toast(`You aren't owner this workspace!`)
    }
  }

}
