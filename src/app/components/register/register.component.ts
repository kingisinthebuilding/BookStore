import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(15)]],
      mobileNo: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]]
    });
  }

  register(registerForm: FormGroup): void {
    if (this.registerForm.invalid) {
      this.snackBar.open('Please fill out the form correctly.', '', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
        panelClass: ['snackbarFailed']
      });
      return;
    }
    // Attach the +91 country code to the mobile number
    const mobileNumberWithCode = `+91${this.registerForm.value.mobileNo}`;
    localStorage.setItem('MobileNo', mobileNumberWithCode);
    const req = {
      "username": this.registerForm.value.username,
      "password": this.registerForm.value.password,
      "email": this.registerForm.value.email,
      "mobileNumber": mobileNumberWithCode
    };

    this.loginService.register(req).subscribe((res: any) => {
      console.log('Response:', res);
      if (res.includes('User registered')) {
        this.snackBar.open('Registration successful!', '', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        });
        this.router.navigate(['/otp-verification']);
      }
    }, (err: any) => {
      console.error('Registration error:', err.message);
      this.snackBar.open('User is already registration.', '', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
        panelClass: ['snackbarFailed']
      });
    });
  }
}