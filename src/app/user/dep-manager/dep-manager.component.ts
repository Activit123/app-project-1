import { CommonModule, NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SkillsComponent } from '../skills/skills.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/authService/auth.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-dep-manager',
  standalone: true,
  imports: [NgIf, CommonModule, RouterLink, SkillsComponent,FormsModule],
  templateUrl: './dep-manager.component.html',
  styleUrl: './dep-manager.component.css'
})
export class DepManagerComponent implements OnInit,OnDestroy{
  logout(): void {
    this.router.navigate(['/login']);
  }
  private unsubscribe$ = new Subject<void>();
  adminId: any;
  employeeDetails: any;
  constructor(private route:ActivatedRoute,private router:Router, private authService:AuthService){}
ngOnInit(): void {
  console.log("intra aici");
  this.route.paramMap.pipe(takeUntil(this.unsubscribe$)).
  subscribe(params =>{
    console.log("intra departament");
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
}
