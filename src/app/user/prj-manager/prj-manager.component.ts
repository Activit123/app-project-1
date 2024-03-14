import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SkillsComponent } from '../skills/skills.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';
import { AuthService } from '../../../services/authService/auth.service';
import { Subject, takeUntil } from 'rxjs';
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

@Component({
  selector: 'app-prj-manager',
  standalone: true,
  imports: [NgIf, CommonModule, RouterLink, SkillsComponent,FormsModule],
  templateUrl: './prj-manager.component.html',
  styleUrl: './prj-manager.component.css'
})
export class PrjManagerComponent implements OnInit,OnDestroy{
onSubmit() {
  console.log(this.project);
}
project: any = { name: '', orgId: '', prPeriod: '', StartD: '', EndD: '', PrStatus: '', description: '', projectManagerID: '', customRoles: [], skillRequirements: [] }; // Initialize project object with empty values
  constructor(private route:ActivatedRoute,private router:Router, private authService:AuthService){

  }
  employeeDetails: any;
  adminId: any ;
  private unsubscribe$ = new Subject<void>();
  ngOnInit(): void {
    console.log("intra aici");
    this.route.paramMap.pipe(takeUntil(this.unsubscribe$)).
    subscribe(params =>{
      console.log("intra admin");
      this.adminId = params.get('employeeId');
      if(this.adminId){
        
        this.employeeDetails = this.authService.getEmployeeDetails(this.adminId).subscribe((data: any) => {
          // Assuming data is an array of skills
            this.employeeDetails = data;
           
           
           // console.log(this.deptName);
            //this.employeeDetails.depId = this.deptName;

        });
      }
    });
  }
  ngOnDestroy(): void {
     // Unsubscribe from the subscription to avoid memory leaks
     this.unsubscribe$.next();
     this.unsubscribe$.complete();
  }

logout(): void {
  this.router.navigate(['/login']);
}

}
