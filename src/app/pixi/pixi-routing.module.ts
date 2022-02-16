import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PixiComponent } from './pixi.component';
const routes: Routes = [
  {
    path: '',
    component: PixiComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PixiRoutingModule { }
