// auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://api218backend.azurewebsites.net';

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/LoginCheck?providedEmail=${email}&providedPassword=${password}`);
  }

  // Function to fetch employee details
  getEmployeeDetails(employeeId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/GetEmployee?employeeId=${employeeId}`);
  }
  getEmployeeOrganization(adminId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/GetEmployeeOrganization?employeeId=${adminId}`);
  }
  getDepartmenteName(employeeId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/DepartamentName?userId=${employeeId}`);
  }
}
