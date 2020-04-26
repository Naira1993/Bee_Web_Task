import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private authService: AuthService) { }

  ngOnInit() {
    const candidate = localStorage.getItem('auth-token');
    if (candidate !== null) {
      console.log(candidate);
      
      this.authService.setToken(candidate)
    }
  }
}
