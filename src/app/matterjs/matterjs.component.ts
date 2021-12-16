import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import {
  Engine,
  Render,
  Body,
  Runner,
  Events,
  Constraint,
  MouseConstraint,
  Mouse,
  Composite,
  Bodies,
  World,
} from 'matter-js';

interface Example {
  slingshot: () => any;
}
@Component({
  selector: 'app-matterjs',
  templateUrl: './matterjs.component.html',
  styleUrls: ['./matterjs.component.scss'],
})
export class MatterJsComponent implements AfterViewInit {
  basketball = 'assets/images/matterjs/basketball.png';
  engine: Engine = Engine.create();
  @ViewChild('continer') continer!: ElementRef;
  constructor() {}

  ngAfterViewInit(): void {
    this.slingshot();
  }
  createdRender() {
    // create renderer
    const render = Render.create({
      element: this.continer.nativeElement,
      engine: this.engine,
      options: {
        width: window.innerWidth,
        height: window.innerHeight - 100,
        wireframes: false,
        showAngleIndicator: false,
        showPerformance: false,
        showSleeping: false,
        showStats: false,
        showIds: false,
      },
    });
    Render.run(render);
    return render;
  }
  createRunner() {
    // create runner
    var runner = Runner.create();
    Runner.run(runner, this.engine);
    return runner;
  }
  createBall() {
    const circleOptions = {
      density: 0.001,
      friction: 0.65,
      frictionStatic: 0.5,
      restitution: 0.8,
      collisionFilter: {
        category: 8,
        mask: 8,
      },
      render: {
        sprite: {
          texture: this.basketball,
          xScale: 0.5,
          yScale: 0.5,
        },
      },
    };
    return Bodies.circle(170, 450, 25, circleOptions);
  }
  createGrounp(canvas:HTMLCanvasElement) {
    var options = {
      isStatic: true,
      collisionFilter: {
        category: 4,
        mask: 4,
      },
    };
    var grounp = Bodies.rectangle(
        canvas.width / 2,
        canvas.height + 40,
        canvas.width,
        80,
        options
      ),
      wallLeft = Bodies.rectangle(
        -30,
        canvas.height / 2,
        60,
        canvas.height,
        options
      ),
      wallRight = Bodies.rectangle(
        canvas.width + 30,
        canvas.height / 2,
        60,
        canvas.height,
        options
      );
    return [grounp, wallLeft, wallRight];
  }
  slingshot() {
    let circle = this.createBall();
    const engine = this.engine;
    const world = engine.world;
    const render = this.createdRender();
    const runner = this.createRunner();
    const canvas = render.canvas;
    const elastic = Constraint.create({
      pointA: { x: 170, y: 450 },
      bodyB: circle,
      stiffness: 0.05,
      render: {
        strokeStyle: 'transparent', // 约束透明
      },
    });
    const grounp = this.createGrounp(canvas);
    const mouse = Mouse.create(render.canvas);
    const ballConstraint = Constraint.create({
      label: 'Ball Mouse Constraint',
      pointA: mouse.position,
      pointB: { x: 0, y: 0 },
      length: 0.01,
      stiffness: 0.1,
      render: {
        visible: false,
      },
    });
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      collisionFilter: {
        category: 8,
        mask: 8,
      },
      constraint: ballConstraint,
    });

    Events.on(engine, 'afterUpdate', () => {
      if (
        mouseConstraint.mouse.button === -1 &&
        (circle.position.x > 190 || circle.position.y < 430)
      ) {
        var newCircle = this.createBall();
        circle.collisionFilter.category = 4;
        circle.collisionFilter.mask = 4;
        Body.setAngularVelocity(circle, Math.PI / 7);
        Composite.add(engine.world, newCircle);
        elastic.bodyB = newCircle;
        circle = newCircle;
      }
    });

    Composite.add(world, [...grounp, circle, elastic,mouseConstraint]);

    Render.lookAt(render, {
      min: { x: 0, y: 0 },
      max: { x: canvas.width, y: canvas.height },
    });

    render.mouse = mouse;
    // context for MatterTools.Demo
    return {
      engine: engine,
      runner: runner,
      render: render,
      canvas: render.canvas,
      stop: function () {
        Render.stop(render);
        Runner.stop(runner);
      },
    };
  }
}
