import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { WorkspaceService } from '../services/workspace.service';
import { Router } from '@angular/router';
import { MaterialService } from '../shared/material.service';

@Component({
  selector: 'app-add-workspace',
  templateUrl: './add-workspace.component.html',
  styleUrls: ['./add-workspace.component.css']
})
export class AddWorkspaceComponent implements OnInit {

  form: FormGroup;

  constructor(private workspaceService: WorkspaceService,
    private router: Router) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      displayName: new FormControl(null, [Validators.required]),
      users: new FormArray([
        new FormControl(null)
      ])
    })
  }

  cancel() {
    this.router.navigate(['/profile'])
  }
  addUser() {
    (<FormArray>this.form.controls["users"]).push(new FormControl(null, Validators.required));
  }

  onSubmit() {
    this.form.disable()
    let id;
    const email = localStorage.getItem('email')
    console.log(email);
    this.workspaceService.create(this.form.value).subscribe(res => {
     
      setTimeout(() => {
        this.router.navigate(['/workspace/', `${res.id}`])
      }, 1000)
    }, error => {
      MaterialService.toast(`This display name already exists, please fill another`)
    })
    this.form.reset()
    this.form.enable()
      

  }
}
