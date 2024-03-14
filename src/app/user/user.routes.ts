import { Route } from "@angular/router";
import { ProfileComponent } from "./profile/profile.component";
import { SkillsComponent } from "./skills/skills.component";
import { OrgAdminComponent } from "./org-admin/org-admin.component";
import { DepManagerComponent } from "./dep-manager/dep-manager.component";
import { PrjManagerComponent } from "./prj-manager/prj-manager.component";

export const profileRoutes:Route[] = [
    {
        path:"",
        component:ProfileComponent
    },
    {
        path:":employeeId",
        component:ProfileComponent
    }
]
export const skillsRoutes: Route[] = [
    {
      path: "",
      component: SkillsComponent
    },
    {
      path: ":skillId",
      component: SkillsComponent // Reuse SkillsComponent for details      
    }
  ];
  export const adminRoutes: Route[] = [
    {
      path: "",
      component: OrgAdminComponent
    },
    {
      path: ":employeeId",
      component: OrgAdminComponent // Reuse SkillsComponent for details      
    }
  ];
  export const depManagerRoutes: Route[] = [
    {
      path: "",
      component: DepManagerComponent
    },
    {
      path: ":employeeId",
      component: DepManagerComponent     
    }
  ];
  export const prjManagerRoutes: Route[] = [
    {
      path: "",
      component: PrjManagerComponent
    },
    {
      path: ":employeeId",
      component: PrjManagerComponent  
    }
  ];