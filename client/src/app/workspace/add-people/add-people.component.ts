import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { WorkspaceService } from 'src/app/services/workspace.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-people',
  templateUrl: './add-people.component.html',
  styleUrls: ['./add-people.component.css']
})
export class AddPeopleComponent implements OnInit {

  form: FormGroup;
  id: string

  constructor(private workspaceService: WorkspaceService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']

    this.form = new FormGroup({
      users: new FormArray([
        new FormControl(null, [Validators.required, Validators.email])
      ])
    })
  }

  addUser() {
    (<FormArray>this.form.controls["users"]).push(new FormControl(null, Validators.required));
  }

  close() {
    this.router.navigate([`workspace/${this.id}`])
  }

  onSubmit() {
    console.log(this.form.value.users);

    this.workspaceService.update(this.id, this.form.value.users).subscribe(() => {
      this.router.navigate([`workspace/${this.id}`])
    })
  }
}
