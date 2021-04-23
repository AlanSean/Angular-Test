import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '@app/shared/shared.module';
import { HomeComponent } from './home.component';
import { PortalModule } from '@angular/cdk/portal';
import { OverlayModule } from '@angular/cdk/overlay';
@NgModule({
  declarations: [HomeComponent],
  imports: [SharedModule, HomeRoutingModule, OverlayModule, PortalModule],
})
export class HomeModule {}

