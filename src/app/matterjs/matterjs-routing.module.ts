import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatterJsComponent } from './matterjs.component';

const routes: Routes = [
  {
    path: '',
    component: MatterJsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MatterjsRoutingModule { }
