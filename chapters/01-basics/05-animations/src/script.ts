import * as THREE from "three";
import gsap from "gsap";

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
renderer.setAnimationLoop(animate);

gsap.to(mesh.position, { duration: 3, delay: 1, z: -5 });
gsap.to(mesh.position, { duration: 3, delay: 4, z: 0 });

function animate(time: number) {
  mesh.rotation.x = time * 0.001;
  mesh.rotation.y = time * 0.001;

  renderer.render(scene, camera);
}
