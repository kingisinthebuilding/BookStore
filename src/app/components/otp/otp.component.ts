import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit {
  otpForm!: FormGroup;
  errorMessage = '';
  successMessage = '';
  mobileNumber: any;

  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.otpForm = this.fb.group({
      otp: ['', [Validators.required]]
    });
    this.mobileNumber = localStorage.getItem('MobileNo');
  }

  verifyOTP(): void {
    if (this.otpForm.invalid) {
      this.snackBar.open('Please enter a valid OTP.', '', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
        panelClass: ['snackbarFailed']
      });
      return;
    }

    const formData = new FormData();
    formData.append('mobileNumber', this.mobileNumber);
    formData.append('otpCode', this.otpForm.value.otp);

    this.loginService.Otp(formData).subscribe((res: any) => {
        if (res) {
          this.snackBar.open('OTP verified successfully!', '', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center'
          });
          this.router.navigate(['/login']);
        } else {
          this.snackBar.open('Invalid OTP. Please try again.', '', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
            panelClass: ['snackbarFailed']
          });
        }
      },
      (err: any) => {
        this.snackBar.open('Verification failed. Please try again.', '', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
          panelClass: ['snackbarFailed']
        });
        console.error(err);
      }
    );
  }
}