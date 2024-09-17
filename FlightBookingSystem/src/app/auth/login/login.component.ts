import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login({ email: this.email, password: this.password })
      .subscribe({
        next: (response) => {
          this.authService.saveToken(response.token);  // Token'ı kaydet
        },
        error: (error) => {
          this.errorMessage = 'Kullanıcı adı veya şifre yanlış!'; 
          console.log(error);
        },
        complete: () => {
          if(this.authService.getRole() === 'Admin') {
            this.router.navigate(['/admin']);  // Admin paneline yönlendir
          }else{
            this.router.navigate(['/flightsearch']);  // Anasayfaya yönlendir
          }
          console.log('Login completed');
        }
      }
      );
  }
}
