import * as THREE from "three";

interface SizesType {
  width: number;
  height: number;
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

// camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  1,
  100,
);

scene.add(camera);
camera.position.z = 3;

// group
const group = new THREE.Group();
scene.add(group);

// 3d objects
const geometry = new THREE.BoxGeometry(1, 1, 1);

const rCube = new THREE.Mesh(
  geometry,
  new THREE.MeshBasicMaterial({ color: 0xff0000 }),
);
const gCube = new THREE.Mesh(
  geometry,
  new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
);
const bCube = new THREE.Mesh(
  geometry,
  new THREE.MeshBasicMaterial({ color: 0x0000ff }),
);

rCube.position.x = -2;
bCube.position.x = 2;
group.add(rCube, gCube, bCube);

// transformation
group.position.z = -2;
group.scale.y = 2;

/**
 * Exactly, this represents a 360-degree rotation.
 * Although it might seem like there's no visible rotation, it is indeed happening.
 * My primary aim here was to demonstrate how you can manipulate mathematical constants like π (Pi).
 */
group.rotation.y = Math.PI * 2;

camera.lookAt(group.position);

// You can normalize its values (meaning that you will reduce the length of the vector to 1 unit but preserve its direction)
group.position.normalize();

console.info(
  "Distance from camera to group: ",
  camera.position.distanceTo(group.position),
);

console.info("Distance from camera to the center: ", camera.position.length());

// axes helper
const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);

// renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
  alpha: false,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
