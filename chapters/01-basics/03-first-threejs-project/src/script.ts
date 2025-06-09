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

const sizes: SizesType = {
  width: canvas.getBoundingClientRect().width,
  height: canvas.getBoundingClientRect().height,
};

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  1,
  100,
);
camera.position.z = 3;

// 3d object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
  alpha: false,
});

renderer.setSize(sizes.width, sizes.height);

renderer.render(scene, camera);
