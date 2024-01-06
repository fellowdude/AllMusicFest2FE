import {ElementRef, NgZone} from '@angular/core';
import {
  ArcRotateCamera,
  Color3,
  Color4,
  DynamicTexture,
  Engine,
  FreeCamera,
  HemisphericLight,
  Light,
  Mesh,
  MeshBuilder,
  Scene,
  StandardMaterial,
  Vector3
} from '@babylonjs/core';
import '@babylonjs/inspector';


export class BasicRenderServiceAbstract {
  protected engine!: Engine;
  protected canvas!: HTMLCanvasElement;
  protected camera!: FreeCamera | ArcRotateCamera;
  protected light!: Light;

  rootMesh!: Mesh;
  scene!: Scene;

  public constructor(private readonly ngZone: NgZone, private document: Document) {
  }

  createScene(canvas: ElementRef<HTMLCanvasElement>): void {
    this.canvas = canvas.nativeElement;
    this.canvas.style.height = '100%';
    this.canvas.style.width = '100%';
    this.engine = new Engine(this.canvas, true);

    this.scene = new Scene(this.engine);
    this.scene.clearColor = new Color4(0, 0, 0, 0);
    this.rootMesh = MeshBuilder.CreateDisc('root', {radius: .01}, this.scene);

    this.light = new HemisphericLight('light1', new Vector3(0, 1, 0), this.scene);

    //this.showWorldAxis(8);

    let clicked = false;
    const currentPosition = {x: 0, y: 0};
    const currentRotation = {x: 0, y: 0};
    let mousemov = false;
    let framecount = 0;
    const mxframecount = 120; //4 secs at 60 fps
    const lastAngleDiff = {x: 0, y: 0};
    const oldAngle = {x: 0, y: 0};
    const newAngle = {x: 0, y: 0};

    this.scene.beforeRender = () => {
      mousemov = false;
    };

    this.scene.afterRender = () => {
      if (!mousemov && framecount < mxframecount) {
        lastAngleDiff.x = lastAngleDiff.x / 1.1;
        this.rootMesh.rotation.x += lastAngleDiff.x;
        framecount++;
        currentRotation.x = this.rootMesh.rotation.x;
      } else if (framecount >= mxframecount) {
        framecount = 0;
      }
    };

    this.camera = new ArcRotateCamera('Camera', 0, 0.8, 70, Vector3.Zero(), this.scene);
    this.camera.setTarget(this.rootMesh);

    canvas.nativeElement.addEventListener('pointerdown', (evt) => {
      currentPosition.x = evt.clientX;
      currentRotation.x = this.rootMesh.rotation.x;
      clicked = true;
    });

    canvas.nativeElement.addEventListener('pointermove', (evt) => {

      if (clicked) {
        mousemov = true;
      }
      if (!clicked) {
        return;
      }
      oldAngle.x = this.rootMesh.rotation.x;
      this.rootMesh.rotation.y -= (evt.clientX - currentPosition.x) / 300.0;
      newAngle.x = this.rootMesh.rotation.x;
      lastAngleDiff.x = newAngle.x - oldAngle.x;
      currentPosition.x = evt.clientX;
    });

    canvas.nativeElement.addEventListener('pointerup', () => {
      clicked = false;
    });
  }

  start(inZone = true): void {
    if (inZone) {
      this.ngZone.runOutsideAngular(() => {
        this.startTheEngine();
      });
    } else {
      this.startTheEngine();
    }
  }

  stop(): void {
    this.scene.dispose();
    this.engine.stopRenderLoop();
    this.engine.dispose();
    this.camera.dispose();
    window.removeEventListener('resize', () => {
    });
  }

  private startTheEngine() {
    let freshRender = true;
    const element = this.document.getElementById('fpsLabel');

    this.engine.runRenderLoop(() => {
      this.scene.render();
      if (element) {
        element.innerHTML = this.engine.getFps().toFixed() + ' fps';
      }
      if (freshRender) {
        this.engine.resize();
        freshRender = false;
      }
    });
    window.addEventListener('resize', () => this.engine.resize());
  }

  showWorldAxis(size: number) {


    const axisX = Mesh.CreateLines(
      'axisX',
      [
        Vector3.Zero(),
        new Vector3(size, 0, 0), new Vector3(size * 0.95, 0.05 * size, 0),
        new Vector3(size, 0, 0), new Vector3(size * 0.95, -0.05 * size, 0)
      ],
      this.scene,
      true
    );

    axisX.color = new Color3(1, 0, 0);
    const xChar = this.makeTextPlane('X', 'red', size / 10);
    xChar.position = new Vector3(0.9 * size, -0.05 * size, 0);

    const axisY = Mesh.CreateLines(
      'axisY',
      [
        Vector3.Zero(), new Vector3(0, size, 0), new Vector3(-0.05 * size, size * 0.95, 0),
        new Vector3(0, size, 0), new Vector3(0.05 * size, size * 0.95, 0)
      ],
      this.scene,
      true
    );

    axisY.color = new Color3(0, 1, 0);
    const yChar = this.makeTextPlane('Y', 'green', size / 10);
    yChar.position = new Vector3(0, 0.9 * size, -0.05 * size);

    const axisZ = Mesh.CreateLines(
      'axisZ',
      [
        Vector3.Zero(), new Vector3(0, 0, size), new Vector3(0, -0.05 * size, size * 0.95),
        new Vector3(0, 0, size), new Vector3(0, 0.05 * size, size * 0.95)
      ],
      this.scene,
      true
    );

    axisZ.color = new Color3(0, 0, 1);
    const zChar = this.makeTextPlane('Z', 'blue', size / 10);
    zChar.position = new Vector3(0, 0.05 * size, 0.9 * size);
  }

  makeTextPlane(text: string, color: string, textSize: number) {
    const dynamicTexture = new DynamicTexture('DynamicTexture', 50, this.scene, true);
    dynamicTexture.hasAlpha = true;
    dynamicTexture.drawText(text, 5, 40, 'bold 36px Arial', color, 'transparent', true);
    const plane = Mesh.CreatePlane('TextPlane', textSize, this.scene, true);
    const material = new StandardMaterial('TextPlaneMaterial', this.scene);
    material.backFaceCulling = false;
    material.specularColor = new Color3(0, 0, 0);
    material.diffuseTexture = dynamicTexture;
    plane.material = material;

    return plane;
  }

}
