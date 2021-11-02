import { NgModule } from '@angular/core';

import { ThreeJsRoutingModule } from './threejs-routing.module';
import { ThreeJsComponent } from './threejs.component';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [ThreeJsComponent],
  imports: [SharedModule, ThreeJsRoutingModule],
})
export class ThreeJsModule {}
