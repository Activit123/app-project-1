import { Routes } from '@angular/router';

export const routes: Routes = [ 
    {
        path: "signup",
        loadChildren:()=>import ("./auth/auth.routes").then((m)=>m.registerRoutes)
    },
    {
        path: "login",
        loadChildren:()=>import ("./auth/auth.routes").then((m)=>m.loginRoutes)
    },
    {
        path:"profile",
        loadChildren:()=>import ("./user/user.routes").then((m) =>m.profileRoutes)
    },
    {
        path:"skills",
        loadChildren:()=>import ("./user/user.routes").then((m) =>m.skillsRoutes)
    },
    {
        path:"admin",
        loadChildren:()=>import ("./user/user.routes").then((m) =>m.adminRoutes)
    },
    {
        path:"department",
        loadChildren:()=>import ("./user/user.routes").then((m) =>m.depManagerRoutes)
    },
    {
        path:"project",
        loadChildren:()=>import ("./user/user.routes").then((m) =>m.prjManagerRoutes)
    }

];
