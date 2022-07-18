import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechTypesComponent } from './tech-types.component';

describe('TechTypesComponent', () => {
  let component: TechTypesComponent;
  let fixture: ComponentFixture<TechTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechTypesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TechTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
