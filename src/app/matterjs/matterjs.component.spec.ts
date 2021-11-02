import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatterJsComponent } from './matterjs.component';

describe('MatterjsComponent', () => {
  let component: MatterJsComponent;
  let fixture: ComponentFixture<MatterJsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatterJsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatterJsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
