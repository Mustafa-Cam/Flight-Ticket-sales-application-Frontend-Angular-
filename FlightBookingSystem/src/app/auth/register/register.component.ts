import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8), // En az 8 karakter
          // Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/), // Büyük harf, küçük harf, özel karakter ve sayı
          this.noUsernameInPassword('username') // Username şifre içinde bulunamaz
        ]
      ]
    });
  }

  // Kullanıcı adının şifre içerisinde yer almasını engelleyen özel validator
  noUsernameInPassword(usernameField: string) {
    return (control: AbstractControl) => {
      const username = this.registerForm?.get(usernameField)?.value;
      const password = control.value;
      if (username && password && password.includes(username)) {
        return { usernameInPassword: true };
      }
      return null;
    };
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      
      this.authService.register(this.registerForm.value).subscribe({
        next: (response) => {
          console.log(response.message);
          
          // Kayıt başarılı olduğunda login ol
          this.authService.login({ email: this.registerForm.value.email, password: this.registerForm.value.password }).subscribe({
            next: (response) => {
              this.authService.saveToken(response.token);  // Token'ı kaydet.
            },
            error: (error) => {
              console.error(error);
            }
          });
        },
        error: (error) => {
          // Hata mesajını alıp alert ile göster.
          // console.log(error.error.message);
          if (error.error && error.error.message) {
            alert(error.error.message);  // Sunucudan gelen mesajı göster.
          } else {
            alert("An error occurred during registration.");
          }
          console.error(error.message);
        },
        complete: () => {
          console.log('Registration complete');
          alert('Kayıt tamamlandı!');
          if (this.authService.getRole() === 'Admin') {
            this.router.navigate(['/admin']);  // Admin paneline yönlendir.
          } else {
            this.router.navigate(['/flightsearch']);  // Anasayfaya yönlendir.
          }
          this.registerForm.reset();
        }
      });
    }
  }
  
}
