import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechTypeDialogComponent } from './tech-type-dialog.component';

describe('TechTypeDialogComponent', () => {
  let component: TechTypeDialogComponent;
  let fixture: ComponentFixture<TechTypeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechTypeDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TechTypeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
