import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
interface Project {
  id?: string;
  name?: string;
  orgId?: string;
  prPeriod?: string;
  StartD?: string;
  EndD?: string;
  PrStatus?: string;
  description?: string;
  TehStack?: string[];
  projectManagerID?: string;
  customRoles?: { key: string; value: string }[];
  skillRequirements?: { key: string; value: string }[];
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http:HttpClient) { }
  private apiUrl = 'https://api218backend.azurewebsites.net';
  createProject(managerUserId: string, project: Project): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<any>(`${this.apiUrl}/GetCustomRolesByOrganization?adminID=${managerUserId}`, project , httpOptions)
      
  }
  
}

