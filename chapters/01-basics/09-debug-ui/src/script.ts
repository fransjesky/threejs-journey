import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls";
import gsap from "gsap";
import GUI from "lil-gui";

interface SizesType {
  width: number;
  height: number;
}

interface CursorType {
  x: number;
  y: number;
}

interface DebugType {
  color: string;
  spin: () => void;
  subdivision: number;
}

// variables init
const canvas = document.getElementById("webgl") as HTMLCanvasElement;
if (!canvas) {
  throw new Error("Canvas element does not found");
}
const scene = new THREE.Scene();
const gui = new GUI();
const debugObj: DebugType = {
  color: "#90b4ff",
  spin: () => {
    gsap.to(mesh.rotation, { y: mesh.rotation.y + Math.PI * 2 });
  },
  subdivision: 1,
};

/**
 * Object containing the width and height of the canvas.
 * @type {SizesType}
 */
const sizes: SizesType = {
  width: window.innerWidth,
  height: window.innerHeight,
};

/**
 * Object containing the cursor position, which is updated in real-time.
 * @type {CursorType}
 */
const cursor: CursorType = {
  x: 0,
  y: 0,
};

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

window.addEventListener("mousemove", (event: MouseEvent) => {
  cursor.x = event.clientX / sizes.width - 0.5;
  cursor.y = -(event.clientY / sizes.height - 0.5);
});

// 3d object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
  color: debugObj.color,
  wireframe: false,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// object tweaks
const objTweak = gui.addFolder("Cube Tweaks");
objTweak.add(mesh.position, "y", -3, 3, 0.01).name("elevation");
objTweak
  .add(debugObj, "subdivision")
  .min(1)
  .max(20)
  .step(1)
  .onChange(() => {
    mesh.geometry.dispose();
    mesh.geometry = new THREE.BoxGeometry(
      1,
      1,
      1,
      debugObj.subdivision,
      debugObj.subdivision,
      debugObj.subdivision,
    );
  })
  .name("cube subdivision");

objTweak.add(mesh, "visible").name("show cube?");
objTweak.add(material, "wireframe").name("show wireframe?");
objTweak
  .addColor(debugObj, "color")
  .onChange((value: string) => {
    material.color.set(value);
  })
  .name("cube color");
objTweak.add(debugObj, "spin").name("Spin Cube!");

// camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  1,
  100,
);

scene.add(camera);
camera.position.z = 3;

// controls
const controls = new OrbitControls(camera, canvas);
controls.target.add(mesh.position);
controls.enableDamping = true;
controls.dampingFactor = 0.01;

// renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
  alpha: true,
});
renderer.setAnimationLoop(animate);
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

function animate() {
  controls.update();

  renderer.render(scene, camera);
}
