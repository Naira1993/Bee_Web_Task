import { Component, OnInit, OnDestroy} from '@angular/core';
import { User } from 'src/app/shared/interface';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { WorkspaceService } from 'src/app/services/workspace.service';

@Component({
  selector: 'app-profile-item',
  templateUrl: './profile-item.component.html',
  styleUrls: ['./profile-item.component.css']
})
export class ProfileItemComponent implements OnInit, OnDestroy {


  user: User
  id: string
  sub: Subscription

  constructor(private authService: AuthService,
    private workspaceService: WorkspaceService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']

    this.sub = this.workspaceService.getById(this.id).subscribe(res => {
      console.log(res.workspace);
      
      this.authService.getUserByEmail(res.workspace.user_email).subscribe(res => {
        this.user = res.user
      })
    })
  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }

}
