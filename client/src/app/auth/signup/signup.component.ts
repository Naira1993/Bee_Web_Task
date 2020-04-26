import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { MaterialService } from 'src/app/shared/material.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  @ViewChild('input') inputRef: ElementRef;
  image: File;
  imagePreview: any = ''
  form: FormGroup;
  // sub: Subscription;

  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      fullName: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
    })
  }

  
  onFileUpload(event: any) {
    const file = event.target.files[0];
    this.image = file;
    const reader = new FileReader()

    reader.onload = () => {
      this.imagePreview = reader.result
    }
    reader.readAsDataURL(file)
  }

  onSubmit() {
    this.form.disable()
    this.authService.signup({...this.form.value}, this.image)
    .subscribe((res) => {
    }, error => {
      MaterialService.toast(`${error.error.message}`)
     })
     this.router.navigate([`/profile`])
  }

}
