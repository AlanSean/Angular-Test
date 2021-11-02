import { NgModule } from '@angular/core';
import { MapRoutingModule } from './map-routing.module';
import { SharedModule } from '@app/shared/shared.module';
import { MapComponent } from './map.component';

@NgModule({
  declarations: [MapComponent],
  imports: [SharedModule, MapRoutingModule],
})
export class MapModule {}
