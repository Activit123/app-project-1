import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  private apiUrl = 'https://api218backend.azurewebsites.net';

  constructor(private http: HttpClient) { }
  assignRole(adminId: string, employeeId: string, role: number): Observable<any> {
    const url = `${this.apiUrl}/AssignRole?id1=${adminId}&id2=${employeeId}&newRole=${role}`;
    return this.http.put<any>(url, null); // Set request body to null
  }
  deleteRole(adminId: string, employeeId: string, role: number): Observable<any> {
    const url = `${this.apiUrl}/DeleteRole?id1=${adminId}&id2=${employeeId}&newRole=${role}`;
    return this.http.put<any>(url, null); // Set request body to null
  }
  addCustomRole(adminID: string, customRoleName: string): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/AddCustomRole?adminId=${adminID}&customRoleName=${customRoleName}`,
      { id:"",name:"",orgID:""} // Pass ID and name as request body
    );
  }

  getCustomRolesByOrganization(adminID: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/GetCustomRolesByOrganization?adminID=${adminID}`);
  }

  

}
