import { CommonModule, NgIf } from '@angular/common';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SkillsComponent } from '../skills/skills.component';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../../../services/authService/auth.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { RolesService } from '../../../services/roleService/roles.service';
@Component({
  selector: 'app-org-admin',
  standalone: true,
  imports: [NgIf, CommonModule, RouterLink, SkillsComponent,FormsModule,NgxPaginationModule],
  templateUrl: './org-admin.component.html',
  styleUrl: './org-admin.component.css'
})
export class OrgAdminComponent implements OnInit,OnDestroy{
DeptName: any;
departments: any;
addDepartment(arg0: any,arg1: any) {
throw new Error('Method not implemented.');
}
CustomRole: any;
departmentClicked: any;
addCustomROle(id: any,customRolename:any) {
   if(customRolename.length >0 && customRolename){
    this.roleService.addCustomRole(id,customRolename).subscribe(data => {
      console.log(data);
      console.log("success");
      this.fetchTeamRoles();
    }, error => {
      console.error('Error fetching team roles:', error);
    });
    
   }
}
addCustomRole() {
throw new Error('Method not implemented.');
}
teamClicked =false;
customRoles: any;
showAddTeamrolePopopEnable= false;
toogleShowDepartments() {
throw new Error('Method not implemented.');
}
  toogleShowTeamRoles() {
    this.teamClicked = !this.teamClicked;
    if (this.teamClicked) {
      this.fetchTeamRoles(); // Fetch team roles when the list is shown
    }
  }
  fetchTeamRoles() {
    this.roleService.getCustomRolesByOrganization(this.adminId) // Replace with logic to get admin ID
      .subscribe(data => {
        console.log(data);
        this.customRoles = data;
      }, error => {
        console.error('Error fetching team roles:', error);
      });
  }
selectedTeamRole: any;

teamRoles: any;
updateTeamRole(arg0: any) {
throw new Error('Method not implemented.');
}
showTeamRolePopupenable: any;
deleteTeamRole(_t72: any) {
throw new Error('Method not implemented.');
}
showTeamRolePopup(_t72: any) {
throw new Error('Method not implemented.');
}
showTeamRoles = false

deleteRole(arg0: string) {
  const selectedIndex = this.roleSelect.nativeElement.selectedIndex;
  console.log("Selected Role:", this.selectedRole);
  console.log("Selected Role Index:", selectedIndex);
  this.roleService.deleteRole(this.adminId,this.selectedEmployee.id,selectedIndex).subscribe(
    (response)=>{
      console.log("Role Added");
      this.ngOnInit();
    },
    (error)=>{
      this.ngOnInit();
      console.error("You dont have permissions or the role is already absent",error);
    }
  );
  this.showAddrolePopopEnable = false; 
}
showAddrolePopopEnable =  false;
addRolePopup(_t36: any) {
throw new Error('Method not implemented.');
}
selectedRole: string = "";
  @ViewChild('roleSelect')
  roleSelect!: ElementRef;
showRolePopup(employee: any) {
 this.showAddrolePopopEnable = true;
 this.selectedEmployee = employee;
}
addRole(_t31: any) {
  const selectedIndex = this.roleSelect.nativeElement.selectedIndex;
  console.log("Selected Role:", this.selectedRole);
  console.log("Selected Role Index:", selectedIndex);
  this.roleService.assignRole(this.adminId,this.selectedEmployee.id,selectedIndex).subscribe(
    (response)=>{
      console.log("Role Added");
      this.ngOnInit();
    },
    (error)=>{
      this.ngOnInit();
      console.error("You dont have permissions or the role is already assigned to this employee",error);
    }
  );
  this.showAddrolePopopEnable = false; 

}
  employees: any[] = []; // Initialize as an empty array
  empClicked = false;
  showEmployeesClicked = false; // Flag to track button click
  totalEmployees = 0; // Total number of employees (fetched from API)
  pageSize = 10; // Number of items per page
  currentPage = 1; // Current page number
onPageChange: any;
selectedEmployee: any;
  logout(): void {
    this.router.navigate(['/login']);
  }
  private unsubscribe$ = new Subject<void>();
adminId: any;
employeeDetails: any;
isAdminRoute: any;

  constructor(private route:ActivatedRoute,private router:Router, private authService:AuthService,private roleService:RolesService){}
  toggleEmployeesList() {
    this.empClicked = !this.empClicked; // Toggle visibility flag on button click
    if (this.empClicked && !this.employees.length) {
      this.showEmployeesClicked = true; // Set flag for initial data fetch
      this.showEmployees(); // Fetch data if list is shown for the first time
    }
  }
  
  showEmployees() {
    this.showEmployeesClicked = true; // Set flag to indicate button clicked
    if (this.adminId) {
      this.authService.getEmployeeOrganization(this.adminId)
        .subscribe(data => {
          this.employees = data;
        });
    }
  }
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
        this.showEmployees();
        this.fetchTeamRoles();
      }
    });
  }
  ngOnDestroy(): void {
     // Unsubscribe from the subscription to avoid memory leaks
     this.unsubscribe$.next();
     this.unsubscribe$.complete();
  }

}
