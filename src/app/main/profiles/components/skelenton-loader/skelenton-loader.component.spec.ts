import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkelentonLoaderComponent } from './skelenton-loader.component';

describe('SkelentonLoaderComponent', () => {
  let component: SkelentonLoaderComponent;
  let fixture: ComponentFixture<SkelentonLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkelentonLoaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkelentonLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
