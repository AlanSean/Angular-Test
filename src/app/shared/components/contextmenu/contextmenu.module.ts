import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalModule } from '@angular/cdk/portal';
import { OverlayModule } from '@angular/cdk/overlay';
import { ContextmenuDirective, ContextmenuComponent } from './contextmenu.component';


@NgModule({
  declarations: [ContextmenuDirective,ContextmenuComponent],
  imports: [CommonModule, PortalModule, OverlayModule],
  exports: [ContextmenuDirective],
  entryComponents: [ContextmenuComponent],
})
export class ContextmenuModule {}
