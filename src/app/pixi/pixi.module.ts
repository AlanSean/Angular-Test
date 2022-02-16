import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PixiRoutingModule } from './pixi-routing.module';
import { PixiComponent } from './pixi.component';


@NgModule({
  declarations: [
    PixiComponent
  ],
  imports: [
    CommonModule,
    PixiRoutingModule
  ]
})
export class PixiModule { }
