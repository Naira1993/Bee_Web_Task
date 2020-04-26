import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { MaterialService } from 'src/app/shared/material.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit, OnDestroy {

  @ViewChild('input') inputRef: ElementRef;
  image: File;
  imagePreview: any = ''
  form: FormGroup;
  email: string;
  sub: Subscription


  constructor(private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.email = this.route.snapshot.params['email']
    this.form = new FormGroup({
      fullName: new FormControl(null, Validators.required),
      image: new FormControl(null)
    })

    this.sub = this.authService.getUserByEmail(this.email).subscribe(res => {
      const user = res.user
      this.form.patchValue({
          fullName: user.fullName,
          image: user.image
      })
    })

  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }

  cancel() {
    this.router.navigate(['/profile'])
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
    const user = {
     ...this.form.value
    }

    this.authService.update(this.email, user, this.image)
      .subscribe(res => { }, error => {
        MaterialService.toast(`${error.error.message}`)
      })
      window.setTimeout(() => {
        this.router.navigate([`/profile`])
      }, 1500)

    this.form.enable();
    this.form.reset()
  }
}
