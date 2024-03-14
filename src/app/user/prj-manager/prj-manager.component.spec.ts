import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrjManagerComponent } from './prj-manager.component';

describe('PrjManagerComponent', () => {
  let component: PrjManagerComponent;
  let fixture: ComponentFixture<PrjManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrjManagerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrjManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
