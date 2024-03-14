import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { AuthService } from '../../../services/authService/auth.service';
import { EmployeeDetailsService } from '../../../services/detailsService/employee-details.service';
import { CommonModule, NgIf } from '@angular/common';
import { SkillsComponent } from "../skills/skills.component";
import { SkillService } from '../../../services/skillService/skill.service';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-profile',
    standalone: true,
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.css',
    imports: [NgIf, CommonModule, RouterLink, SkillsComponent,FormsModule]
})
export class ProfileComponent implements OnInit,OnDestroy{

  employeeId: any;
  private unsubscribe$ = new Subject<void>();
  employeeDetails: any;
  employeeDetailsSubscription: Subscription = new Subscription;
  deptName:any;
skills: any;
showSkills = false;

  selectedSkill: any; // To store the selected skill for popup
  skillLevel: string = '';
  skillExperience: string = ''
showAddSkillPopupEnable = false;
isAdminRoute = false;
isNavigating = false;



  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private skillService: SkillService,
    private employeeDetailsService: EmployeeDetailsService,
    private router: Router
  ) { }
  logout(): void {
    this.router.navigate(['/login']);
  }
  navigateToAdmin() {
    this.isNavigating = true; // Set flag to indicate navigation
    this.router.navigate(['/admin', this.employeeDetails.id])
      .then(() => {
        this.isNavigating = false; // Reset flag after successful navigation
      })
      .catch(error => {
        console.error('Navigation error:', error);
        this.isNavigating = false; // Reset flag even on error
      });
  }
  showAddSkillPopup(skill: any) {
    this.showAddSkillPopupEnable = true;
    this.selectedSkill = skill; // Store the selected skill
    this.skillLevel = ''; // Reset input values on each popup
    this.skillExperience = '';
  }

  addSkill() {
    // Implement logic to save skill level and experience for the selected skill
    // This might involve updating your data source and potentially refreshing the skills list
    console.log(`empid:${this.employeeDetails.id} skillid: empid:${this.selectedSkill.id} Skill: ${this.selectedSkill.name}, Level: ${this.skillLevel}, Experience: ${this.skillExperience}`); // Example logging
    this.skillService.assignSkill(this.employeeDetails.id,this.selectedSkill.id,parseInt(this.skillLevel),this.skillExperience).subscribe(
      (response)=>{
        console.log("skill added");
        this.ngOnInit();
      },
      (error)=>{
        this.ngOnInit();
        console.error("skill not added",error);
      }
    );
    this.showAddSkillPopupEnable = false; // Hide the popup after adding
  }
  viewSkills(): void{
    this.showSkills = !this.showSkills; // Toggle visibility on click
    if (this.employeeDetails.id) {
      this.skillService.getAllSkills(this.employeeDetails.id)
      .subscribe((data: any) => {
        // Assuming data is an array of skills
        console.log("intra");
        this.skills = data;
        
      });
    }
  }
 
  ngOnInit() {

    // Retrieve query parameters from the activated route
    this.route.paramMap.
    pipe(takeUntil(this.unsubscribe$)).
    subscribe(params => {
      console.log("intra");
      this.employeeId = params.get('employeeId');
      console.log(this.employeeId);
      if(this.employeeId){
        
        this.employeeDetails = this.authService.getEmployeeDetails(this.employeeId).subscribe((data: any) => {
          // Assuming data is an array of skills
            this.employeeDetails = data;
            this.authService.getDepartmenteName(this.employeeId).subscribe((data: any) => {
              const departmentName = data.DepartmentName;
              console.log(departmentName); // This will print "HR"
              this.deptName = departmentName;
            });
           
           // console.log(this.deptName);
            //this.employeeDetails.depId = this.deptName;

        });
      }
    });

    // Subscribe to changes in employeeDetails 
  }

  ngOnDestroy(){
    // Unsubscribe from the subscription to avoid memory leaks
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}