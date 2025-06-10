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

/**
 * While it is technically possible to not add the camera to the scene,
 * it is highly recommended to do so. Omitting the camera from the scene
 * can lead to unexpected issues, particularly with camera-related
 * or distance calculations.
 */
scene.add(camera);
camera.position.z = 3;

// 3d object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshNormalMaterial();
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
  alpha: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
