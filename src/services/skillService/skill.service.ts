import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
interface AssignedSkill {
  userId: string;
  skillId: string;
  level: number;
  experience: string;
}
@Injectable({
  providedIn: 'root'
})

export class SkillService {
  
  private apiUrl = 'https://api218backend.azurewebsites.net';

  constructor(private http: HttpClient) { }

  getAllSkills(managerUserId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/GetAllSkills?managerUserId=${managerUserId}`);
  }
  assignSkill(userId: string, skillId: string, level: number, experience: string): Observable<any> {
    const url = `${this.apiUrl}/AssignSkill?userId=${userId}&skillId=${skillId}&level=${level}&experience=${experience}`;
  
    return this.http.post<any>(url, null) // No request body needed since data is in URL
      
     
  }
}
