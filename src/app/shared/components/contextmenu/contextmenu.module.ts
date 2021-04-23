import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContextmenuDirective } from '@app/shared/directives/contextmenu/contextmenu.directive';
import { PortalModule } from '@angular/cdk/portal';
import { OverlayModule } from '@angular/cdk/overlay';
import { ContextmenuComponent } from './contextmenu.component';


@NgModule({
  declarations: [ContextmenuComponent, ContextmenuDirective],
  imports: [CommonModule, PortalModule, OverlayModule],
  exports: [ContextmenuDirective],
  entryComponents: [ContextmenuComponent],
})
export class ContextmenuModule {}
