import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as Matter from 'matter-js';

interface Example {
  slingshot: () => any;
}
@Component({
  selector: 'app-matterjs',
  templateUrl: './matterjs.component.html',
  styleUrls: ['./matterjs.component.less'],
})
export class MatterJsComponent implements AfterViewInit {
  basketball = 'assets/images/matterjs/basketball.png';
  @ViewChild('continer') continer!: ElementRef;
  constructor() {}

  ngAfterViewInit(): void {
    this.slingshot();
  }
  slingshot() {
    var Engine = Matter.Engine,
      Render = Matter.Render,
      Runner = Matter.Runner,
      Events = Matter.Events,
      Constraint = Matter.Constraint,
      MouseConstraint = Matter.MouseConstraint,
      Mouse = Matter.Mouse,
      Composite = Matter.Composite,
      Bodies = Matter.Bodies;

    // create engine
    var engine = Engine.create(),
      world = engine.world;

    // create renderer
    var render = Render.create({
      element: this.continer.nativeElement,
      engine: engine,
      options: {
        width: window.innerWidth,
        height: window.innerHeight-100,
        wireframes: false,
        showAngleIndicator: false,
        showPerformance: false,
        showSleeping: false,
        showStats: false,
        showIds: false,
      },
    });

    var canvas = render.canvas;
    Render.run(render);

    // create runner
    var runner = Runner.create();
    Runner.run(runner, engine);
    // add bodies
    var circleOptions = {
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
    var options = {
      isStatic: true,
      collisionFilter: {
        category: 4,
        mask: 4,
      },
    };
    var circle = Bodies.circle(170, 450, 25, circleOptions);
    var elastic = Constraint.create({
      pointA: { x: 170, y: 450 },
      bodyB: circle,
      stiffness: 0.05,
      render: {
        strokeStyle: 'transparent', // 约束透明
      },
    });
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
    Composite.add(world, [grounp, wallLeft, wallRight, circle, elastic]);

    Events.on(engine, 'afterUpdate', function () {
      if (
        mouseConstraint.mouse.button === -1 &&
        (circle.position.x > 190 || circle.position.y < 430)
      ) {
        var newCircle = Bodies.circle(170, 450, 25, circleOptions);
        circle.collisionFilter.category = 4;
        circle.collisionFilter.mask = 4;
        Matter.Body.setAngularVelocity(circle, Math.PI / 7);
        Composite.add(engine.world, newCircle);
        elastic.bodyB = newCircle;
        circle = newCircle;
      }
    });
    var mouse = Mouse.create(render.canvas),
      mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        collisionFilter: {
          category: 8,
          mask: 8,
        },
        constraint: {
          render: {
            visible: false,
          },
        },
      });
    Composite.add(world, mouseConstraint);

    // fit the render viewport to the scene
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
        Matter.Render.stop(render);
        Matter.Runner.stop(runner);
      },
    };
  }
  createGround() {
    const engine = Matter.Engine.create();
    const bounds = Matter.Bounds.create({});
    const render = Matter.Render.create({
      element: document.body,
      engine,
    });
    const boxA = Matter.Bodies.rectangle(400, 200, 80, 80);
    const boxB = Matter.Bodies.rectangle(400, 50, 80, 80);
    const ground = Matter.Bodies.rectangle(400, 610, 810, 60, {
      isStatic: true,
    });

    Matter.Composite.add(engine.world, [boxA, boxB, ground]);

    Matter.Render.run(render);

    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);
  }
  restitution() {
    var Engine = Matter.Engine,
      Render = Matter.Render,
      Runner = Matter.Runner,
      MouseConstraint = Matter.MouseConstraint,
      Mouse = Matter.Mouse,
      Composite = Matter.Composite,
      Bodies = Matter.Bodies;

    // create engine
    var engine = Engine.create(),
      world = engine.world;

    // create renderer
    var render = Render.create({
      element: document.body,
      engine: engine,
      options: {
        width: 800,
        height: 600,
        showAngleIndicator: true,
        showCollisions: true,
        showVelocity: true,
      },
    });

    Render.run(render);

    // create runner
    var runner = Runner.create();
    Runner.run(runner, engine);

    // add bodies
    var rest = 0.9,
      space = 600 / 5;

    Composite.add(world, [
      Bodies.circle(100 + space * 3, 150, 25, { restitution: rest }),
      // walls
      Bodies.rectangle(400, 0, 800, 50, { isStatic: true }),
      Bodies.rectangle(400, 600, 800, 50, { isStatic: true }),
      Bodies.rectangle(800, 300, 50, 600, { isStatic: true }),
      Bodies.rectangle(0, 300, 50, 600, { isStatic: true }),
    ]);

    // add mouse control
    var mouse = Mouse.create(render.canvas),
      mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
      });

    Composite.add(world, mouseConstraint);

    // keep the mouse in sync with rendering
    render.mouse = mouse;

    // fit the render viewport to the scene
    Render.lookAt(render, {
      min: { x: 0, y: 0 },
      max: { x: 800, y: 600 },
    });

    // context for MatterTools.Demo
    return {
      engine: engine,
      runner: runner,
      render: render,
      canvas: render.canvas,
      stop: function () {
        Matter.Render.stop(render);
        Matter.Runner.stop(runner);
      },
    };
  }
}
