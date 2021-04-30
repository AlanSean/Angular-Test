import {
  Component,
  ViewEncapsulation,
  Directive,
  ElementRef,
  // 表示可以将一个或多个视图附着到组件中的容器。
  ViewContainerRef,
  // 可用来动态创建组件的工厂的基类。resolveComponentFactory() 实例化给定类型的组件的工厂。使用生成的 ComponentFactory.create() 方法创建该类型的组件。
  ComponentFactory,
  AfterViewInit,
  // 一个简单的注册表，它将 Components 映射到生成的 ComponentFactory 类，该类可用于创建组件的实例。用于获取给定组件类型的工厂，然后使用工厂的 create() 方法创建该类型的组件。
  ComponentFactoryResolver,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  HostListener,
  ViewChild,
} from "@angular/core";
import { animate, style, transition, trigger } from "@angular/animations";
import { ComponentType, Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';


@Directive({
  selector: "[appCompare]",
})
export class CompareDirective implements AfterViewInit {
  component!: CompareComponent;
  origin!: any;
  //resolver.resolveComponentFactory ：检索创建给定类型组件的工厂对象。
  componentFactory: ComponentFactory<CompareComponent> = this.resolver.resolveComponentFactory(
    CompareComponent
  );

  constructor(
    private elementRef: ElementRef,
    protected resolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef,
  ) { }

  @HostListener('click') onclick(){
    this.component?.show();
  }
  
  ngAfterViewInit(): void {
    this.created();
  }

  protected created() {
    this.component = this.viewContainerRef.createComponent(
      this.componentFactory
    ).instance;
    this.component.saveOrigin(this.elementRef);
  }

}

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  animations: [
    trigger("zoom", [
      transition("void => active", [
        style({ opacity: 0, transform: "scale3d(0.3, 0.3, 0.3)" }),
        animate(
          "0.2s",
          style({
            opacity: 1,
            transform: "scale3d(1, 1, 1)",
          })
        ),
      ]),
      transition("active => void", [
        style({ opacity: 1, transform: "scale3d(1, 1, 1)" }),
        animate(
          "0.1s",
          style({
            opacity: 0,
            transform: "scale3d(0.3, 0.3, 0.3)",
          })
        ),
      ]),
    ]),
  ],
})
export class CompareComponent {
  @ViewChild('left') left!:ElementRef;
  @ViewChild('right') right!: ElementRef;
  origin!: ElementRef;
  isOpen: boolean = false;
  color = localStorage.color || 'black';
  styles = '';
  dragPosition = { x: 0, y: 0 };
  colors = [
    'black',
    'white',
    'transparent',
    'red',
    'green',
    'blue'
  ]
  constructor(
    private cdr: ChangeDetectorRef
  ) { }
  setColor(color:string){
    this.color = color;
    localStorage.color = color;
    this.cdr.detectChanges();
  }
  saveOrigin(origin: ElementRef) {
    //关闭检测 因为会出现警告
    this.cdr.detach();
    this.origin = origin;
    this.cdr.markForCheck();
  }
  show() {
    if (!this.isOpen) this.isOpen = true;
    this.cdr.detectChanges();
  }
  hide() {
    if (this.isOpen) this.isOpen = false;
    this.cdr.detectChanges();
  }

  mousewheel = (e: any) => {
    console.log(e.deltaY);
    this.styles = "transform: scale3d(14, 14, 1) rotate(0deg);"
  }

}

