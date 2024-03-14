import { Component, NgModule } from '@angular/core';
import { AuthService } from '../../../services/authService/auth.service';
import { EmpIdService } from '../../../services/idService/emp-id.service';
import { Router, RouterLink } from '@angular/router';
import { EmployeeDetailsService } from '../../../services/detailsService/employee-details.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { routes } from '../../app.routes';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink,CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email!: string;
  password!: string;
  errorMessage: any;
  message: any;
  employeeDetails: any;
  isLoggedIn: boolean = false; // Track login state

  constructor(
    private authService: AuthService,
    private empIdService: EmpIdService,
    private employeeDetailsService: EmployeeDetailsService,
    private router: Router
  ) { }

  
  onSubmit(): void {
    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        console.log('Login successful', response);
        
      },
      (error) => {
        console.error('Login error', error);
        this.isLoggedIn = true; // Update login state
        this.empIdService.empId = error.error.text;
        this.message = this.empIdService.empId;
        this.router.navigate(['/profile', this.empIdService.empId]); 
        //this.fetchEmployeeDetails(this.empIdService.empId);
        this.errorMessage = 'Login failed. Please try again.';
      }
    );
  }
  register():void{
    this.router.navigate(['/signup']);
  }
  
  logout(): void {
    this.isLoggedIn = false; // Update login state
    this.employeeDetails = null; // Reset employee details
    this.empIdService.empId = ''; // Clear employee ID
    this.router.navigate(['/login']);
  }

  fetchEmployeeDetails(employeeId: string): void {
    this.authService.getEmployeeDetails(employeeId).subscribe(
      (response) => {
        console.log('Employee details:', response);
        this.employeeDetails = response;
       // this.router.navigate(['/skills', this.empIdService.empId]);
        this.employeeDetailsService.setEmployeeDetails(response);
        this.router.navigate(['/skills', this.empIdService.empId]); // Navigate with parameter
      },
      (error) => {
        console.error('Error fetching employee details:', error);
        this.errorMessage = 'Error fetching employee details. Please try again.';
      }
    );
  }
}
