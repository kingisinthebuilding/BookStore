import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  errorMessage = '';
  successMessage = '';

  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(15)]]
    });
  }

  login(loginForm: FormGroup) {
    if (this.loginForm.invalid) {
      this.snackBar.open('Please fill out the form correctly.', '', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
        panelClass: ['snackbarFailed']
      });
      return;
    }
    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const req = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
      email: this.loginForm.value.email
    };
    const formDataPayload = this.convertToFormData(req);

    this.loginService.login(formDataPayload).subscribe(
      (res: any) => {
        console.log('loginForm ', res);
        const token = this.extractToken(res);
        if (token) {
          localStorage.setItem('authToken', token); // Store only the token
          this.snackBar.open('Login Succesfully Done!', '', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center'
          });
          this.router.navigate(['/dashboard/home']); // Navigate to the desired page
        }
      },
      (err: HttpErrorResponse) => {
        console.log("LoginForm ", err);
        if (err.status === 404 && err.error === "User not found") {
          this.snackBar.open('User not found. Please register first.', '', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
            panelClass: ['snackbarFailed']
          });          
        } else {
          this.snackBar.open('An error occurred. Please try again later.', '', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
            panelClass: ['snackbarFailed']
          });
        }
        this.loading = false;
      }
    );
  }

  private convertToFormData(data: any): FormData {
    const formData = new FormData();
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        formData.append(key, data[key]);
      }
    }
    return formData;
  }

  extractToken(response: any): string | null {
    const tokenPattern = /Token:\s*(\S+)/; // Regex to match token
    const match = tokenPattern.exec(response);
    return match ? match[1] : null;
  }
}