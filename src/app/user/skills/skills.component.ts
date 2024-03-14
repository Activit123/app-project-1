import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { SkillService } from '../../../services/skillService/skill.service';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [NgIf,CommonModule,RouterLink],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css'
})
export class SkillsComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  skillId: any; // Variable to store the skillId
  @Input() id:any
  skills: any;

  constructor(
    private skillService: SkillService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    console.log(this.id);
    // Accessing route parameter
    if(this.id !=null){
        this.skillId= this.id;
        if (this.skillId) {
          this.skillService.getAllSkills(this.skillId)
          .subscribe((data: any) => {
            // Assuming data is an array of skills
            this.skills = data;
          });
    
        }
    }

    this.route.paramMap
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(params => {   
        this.skillId = params.get('skillId');
        // Optionally, use the skillId to fetch specific skill data
        if (this.skillId) {
          this.skillService.getAllSkills(this.skillId)
          .subscribe((data: any) => {
            // Assuming data is an array of skills
            this.skills = data;
          
          });
        }
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
