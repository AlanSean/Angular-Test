import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ThreeRenderer } from './utils/three';

@Component({
  selector: 'app-three',
  templateUrl: './threejs.component.html',
  styleUrls: ['./threejs.component.less'],
})
export class ThreeJsComponent implements AfterViewInit {
  @ViewChild('continer') continer!: ElementRef;
  constructor() {}

  ngAfterViewInit(): void {
    console.log(this.continer)
    ThreeRenderer(this.continer.nativeElement);
    console.log(23);
  }
}
