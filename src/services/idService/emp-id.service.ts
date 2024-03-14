// emp-id.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmpIdService {
  empId: string = ''; // Variable to store employee ID
  errorMessage: string = ''; // Variable to store error message

  constructor() { }
}
