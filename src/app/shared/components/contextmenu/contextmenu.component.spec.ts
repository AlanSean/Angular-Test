import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { PortalModule } from '@angular/cdk/portal';
import { OverlayModule } from '@angular/cdk/overlay';
import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  ContextmenuComponent,
  ContextmenuDirective,
} from './contextmenu.component';

// describe('ContextmenuDirective', () => {
//   it('should create an instance', () => {
//     const directive = new ContextmenuDirective();
//     expect(directive).toBeTruthy();
//   });
// });

describe('ContextmenuComponent', () => {
  let component: ContextmenuComponent;
  let fixture: ComponentFixture<ContextmenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContextmenuDirective, ContextmenuComponent],
      imports: [CommonModule, PortalModule, OverlayModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContextmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
