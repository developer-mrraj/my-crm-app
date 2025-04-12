import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl,FormGroup } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-auth',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {

  isActive: boolean = true;

  loginForm: FormGroup = new FormGroup({
    username : new FormControl(""),
    password : new FormControl("")
  })

  signupForm: FormGroup = new FormGroup({
    name : new FormControl(""),
    email : new FormControl(""),
    password : new FormControl("")
  })
  
  http= inject(HttpClient)
  router= inject(Router)
  onLogin() {
    const formData = new URLSearchParams();
    // URLSearchParams() helps format data like username=john&password=1234
    formData.append('username', this.loginForm.value.username);
    formData.append('password', this.loginForm.value.password);

  
    this.http.post("http://localhost:8000/login", formData.toString(), {
      headers: { 
        'Content-Type': 'application/x-www-form-urlencoded' // Required for OAuth2PasswordRequestForm
      }
    }).subscribe(
      (res: any) => {
        localStorage.setItem("access_token", res.access_token);
        this.router.navigateByUrl("business-overview");
      },
      (error) => {
        alert('Invalid credentials');
        console.error(error);
      }
    );
  }
  
  onSignup(){
    const formData = this.signupForm.value

    this.http.post("http://localhost:8000/user", formData).subscribe((res:any)=>{
      alert('User created successfully');
    },
    (error) => {
      console.error('Error:', error); // Log the error response
      alert('Error creating user');
    })
  }

  toggleForm() {
    this.isActive = !this.isActive;
  }

  reloadPage() {
    setTimeout(() => {
      window.location.reload();
    }, 2000); // 0.67 seconds delay
  }
}
