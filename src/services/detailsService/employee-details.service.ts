import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDetailsService {
  private employeeDetails: any;

  constructor() { }

  setEmployeeDetails(details: any): void {
    this.employeeDetails = details;
  }

  getEmployeeDetails(): any {
    return this.employeeDetails;
  }
}
