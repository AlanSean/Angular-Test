import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { CdkPortal } from '@angular/cdk/portal';

@Component({
  selector: 'app-contextmenu',
  templateUrl: './contextmenu.component.html',
  styleUrls: ['./contextmenu.component.less'],
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  animations: [
    trigger('zoom', [
      transition('void => active', [
        style({ opacity: 0, transform: 'scale(0.8)' }),
        animate(
          '0.2s cubic-bezier(0.08, 0.82, 0.17, 1)',
          style({
            opacity: 1,
            transform: 'scale(1)',
          })
        ),
      ]),
      transition('active => void', [
        style({ opacity: 1, transform: 'scale(1)' }),
        animate(
          '0.1s cubic-bezier(0.78, 0.14, 0.15, 0.86)',
          style({
            opacity: 0,
            transform: 'scale(0.8)',
          })
        ),
      ]),
    ]),
  ],
})
export class ContextmenuComponent implements OnInit {
  origin!: HTMLDivElement;
  private _overlayTemplateRef: OverlayRef | null = null;
  @ViewChild('templatePortals') templatePortals!: CdkPortal;
  constructor(private overlay: Overlay) {}

  ngOnInit(): void {}
  onOutsideClick(e: MouseEvent) {
    console.log(this.origin);
    if (e.target != null && !this.origin.contains(e.target as Node)) {
      this.hide();
      console.log(this.hide);
    }
  }
  hide() {
    if (this._overlayTemplateRef) {
      this._overlayTemplateRef.detach();
      this._overlayTemplateRef = null;
    }
  }
  getStrategy(origin: HTMLDivElement) {
    return this.overlay
      .position()
      .flexibleConnectedTo(origin)
      .withPositions([
        {
          originX: 'end',
          originY: 'center',
          overlayX: 'start',
          overlayY: 'center',
        },
      ]);
  }
  showOverlay(e: Event) {
    if (this._overlayTemplateRef && this.origin === e.target) return;
    if (this._overlayTemplateRef) {
      this._overlayTemplateRef.detach();
    }
    this.origin = e.target as HTMLDivElement;
    const positionStrategy = this.getStrategy(this.origin);

    this._overlayTemplateRef = this.overlay.create({
      positionStrategy,
    });

    this._overlayTemplateRef.attach(this.templatePortals);

    this._overlayTemplateRef.outsidePointerEvents().subscribe((v) => {
      this.onOutsideClick(v);
    });
  }
}
