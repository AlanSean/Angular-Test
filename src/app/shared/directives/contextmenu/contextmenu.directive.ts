import { AfterViewInit, Directive, ElementRef, OnChanges, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appContextmenu]',
  exportAs: 'contextmenu',
})
export class ContextmenuDirective
  implements OnChanges, OnDestroy, AfterViewInit {
  constructor(
    private elementRef: ElementRef
  ) {}
  ngOnChanges() {}
  ngOnDestroy() {}
  ngAfterViewInit() {
    console.log(this.elementRef)
  }
}
