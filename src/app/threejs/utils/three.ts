import * as Three from 'three';
import { MeshBasicMaterialParameters } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

class ThreeTest {
  private renderer = new Three.WebGLRenderer({ antialias: true });
  camera = new Three.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.25,
    20
  );
  material = this.getMaterial({ color: 0x0000ff });
  scene = new Three.Scene();

  constructor(continer:Element) {
    const div = document.createElement('div');
    const renderer = this.renderer;
    const scene = this.scene;
    const camera = this.camera;

    this.camera.position.set(-1.8, 0.6, 2.7);
    continer.appendChild(div);

    new RGBELoader().load(
      'https://threejs.org/examples/textures/equirectangular/royal_esplanade_1k.hdr',
      (texture) => {
        console.log('texture',texture)
        texture.mapping = Three.EquirectangularReflectionMapping;

        scene.background = texture;
        scene.environment = texture;

        this.render();
        const loader = new GLTFLoader().load(
          'https://threejs.org/examples/models/gltf/DamagedHelmet/glTF/DamagedHelmet.gltf',
          (gltf) => {
            gltf.scene.traverse(function (child) {});

            scene.add(gltf.scene);

            this.render();
          }
        );
      }
    );

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = Three.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    renderer.outputEncoding = Three.sRGBEncoding;
    div.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.addEventListener('change', this.render.bind(this));
    controls.minDistance = 2;
    controls.maxDistance = 10;
    controls.target.set(0, 0, -0.2);
    controls.update();

    window.addEventListener('resize', this.onWindowResize.bind(this));
  }
  private onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.render();
  }
  public render() {
    this.renderer.render(this.scene, this.camera);
  }

  getMaterial(parameters?: MeshBasicMaterialParameters) {
    return new Three.MeshBasicMaterial({
      color: 0x0000ff,
    });
  }
}


export function ThreeRenderer(continer:Element) {
  new ThreeTest(continer).render();
}
