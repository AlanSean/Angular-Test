import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '@app/shared/shared.module';
import { HomeComponent } from './home.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [HomeComponent],
  imports: [SharedModule, HomeRoutingModule, MatIconModule],
})
export class HomeModule {}
