import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    pathMatch: 'full',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'map',
    pathMatch: 'full',
    loadChildren: () => import('./map/map.module').then((m) => m.MapModule),
  },
  {
    path: 'three',
    pathMatch: 'full',
    loadChildren: () =>  import('./threejs/threejs.module').then((m) => m.ThreeJsModule),
  },
  {
    path: 'matter',
    pathMatch: 'full',
    loadChildren: () =>  import('./matterjs/matterjs.module').then((m) => m.MatterJsModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
