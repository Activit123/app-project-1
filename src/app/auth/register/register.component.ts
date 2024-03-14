import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Route, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink,CommonModule,FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  signupForm=this.formBuilder.nonNullable.group({
    name:['',Validators.required],
    address:['',Validators.required]
  })

 
  signupResponse: string = ''; // Property to store the response message
  showTableView: boolean = true; // Toggle variable for table view

  constructor(private formBuilder: FormBuilder, private http: HttpClient,private router: Router) {}
  login() {
    this.router.navigate(['/login']);
  }
  onSignup() {
    if (this.signupForm.invalid) {
      return;
    }

    const organizationData = this.signupForm.value;

    this.http.post<any>('https://api218backend.azurewebsites.net/AddOrganization', organizationData)
      .subscribe(
        response => {
          console.log('Organization signup successful:', response);
          // Set the response message to display on the label
          this.signupResponse = response;
          // Refresh organization details after signup
         // this.loadOrganizationDetails();
        },
        error => {
          console.error('Error signing up organization:', error);
          // Set the error message to display on the label
          this.signupResponse = 'Error signing up organization. Please try again.';
        }
      );
  }
}
