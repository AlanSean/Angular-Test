import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ThreeJsComponent } from './threejs.component';

const routes: Routes = [
  {
    path: '',
    component: ThreeJsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ThreeJsRoutingModule {}
