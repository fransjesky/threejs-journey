import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

interface SizesType {
  width: number;
  height: number;
}

interface CursorType {
  x: number;
  y: number;
}

// variables init
const canvas = document.getElementById("webgl") as HTMLCanvasElement;
if (!canvas) {
  throw new Error("Canvas element does not found");
}
const scene = new THREE.Scene();

/**
 * Object containing the width and height of the canvas.
 * @type {SizesType}
 */
const sizes: SizesType = {
  width: canvas.getBoundingClientRect().width,
  height: canvas.getBoundingClientRect().height,
};

/**
 * Object containing the cursor position, which is updated in real-time.
 * @type {CursorType}
 */
const cursor: CursorType = {
  x: 0,
  y: 0,
};

window.addEventListener("mousemove", (event: MouseEvent) => {
  cursor.x = event.clientX / sizes.width - 0.5;
  cursor.y = -(event.clientY / sizes.height - 0.5);
});

// 3d object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshNormalMaterial();
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

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
controls.autoRotate = true;

// renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
  alpha: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setAnimationLoop(animate);

function animate() {
  controls.update();
  renderer.render(scene, camera);
}
