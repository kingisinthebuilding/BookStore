import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintainenceComponent } from './maintainence.component';

describe('MaintainenceComponent', () => {
  let component: MaintainenceComponent;
  let fixture: ComponentFixture<MaintainenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaintainenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaintainenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
