### requestAnimationFrame - RAF (Classic Technique)

The primary purpose of `requestAnimationFrame` is not to run code on each frame.

`requestAnimationFrame` will execute the function you provide on the next frame. But then, if this function also uses `requestAnimationFrame` to execute that same function on the next frame, you'll end up with your function being executed on each frame forever which is exactly what we want.

Create a function named `tick` and call this function once. In this function, use `window.requestAnimationFrame(...)` to call this same function on the next frame:

```ts
function tick() {
  window.requestAnimationFrame(tick);
}

tick();
```

### Adaptation to the framerate

To adapt the animation to the framerate, we need to know how much time it's been since the last tick. First, we need a way to measure time. In native JavaScript, you can use Date.now() to get the current timestamp:

```ts
let time = Date.now();
```

The timestamp corresponds to how much time has passed since the 1st of January 1970 (the beginning of time for Unix). In JavaScript, its unit is in milliseconds.

What you need now is to subtract the current timestamp to that of the previous frame to get what we can call the deltaTime and use this value when animating objects:

```ts
let time: number = Date.now();

function tick() {
  const currentTime: number = Date.now();
  const deltaTime: number = currentTime - time;
  time = currentTime;

  mesh.rotation.y += 0.001 * deltaTime;

  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
}

tick();
```

The cube should rotate faster because the deltaTime should be around 16 if your screen is running at 60fps, so feel free to reduce it by multiplying the value.

Now that we base our rotation on how much time was spent since the last frame, this rotation speed will be the same on every screen and every computers regardless of the frame rate.

---

### Three.js Clock

While this code isn't that complicated, there is a built-in solution in Three.js named Clock that will handle the time calculations.

You simply have to instantiate a Clock variable and use the built-in methods like getElapsedTime(). This method will return how many seconds have passed since the Clock was created.

```ts
const clock = new THREE.Clock();

function tick() {
  const elapsedTime: number = clock.getElapsedTime();

  mesh.rotation.y = elapsedTime;

  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
}

tick();
```

---

### setAnimationLoop - Three.js Loop (Modern Technique)

The setAnimationLoop method was introduced in Three.js r110, which was released in October 2019.

This method was added to better support WebXR and allow rendering loops to be compatible with VR and AR sessions. It replaces or supplements the use of requestAnimationFrame by allowing Three.js to manage the animation loop in a way that works seamlessly with XR devices.

Based on my understanding, renderer.setAnimationLoop() was initially perceived as mere syntactic sugar for requestAnimationFrame in non-VR Three.js projects. However, it appears to have evolved into a more capable feature (it is actually doing more than just a RAF), and it's now widely adopted in the official Three.js documentation and examples. Furthermore, its use becomes particularly advantageous, and indeed recommended, when working with the newer WebGPURenderer.

```ts
renderer.setAnimationLoop(animate);

function animate(time: number) {
  mesh.rotation.x = time * 0.001;
  mesh.rotation.y = time * 0.001;

  renderer.render(scene, camera);
}
```

---

### Animation Library (GSAP, Framer Motion, etc)

Sometimes you'll want to animate your scene in a very specific way that will require using another library. There are tons of animation libraries, but a very famous one is GSAP.

```ts
import gsap from "gsap";

renderer.setAnimationLoop(animate);

gsap.to(mesh.position, { duration: 3, delay: 1, z: -5 });
gsap.to(mesh.position, { duration: 3, delay: 4, z: 0 });

function animate(time: number) {
  mesh.rotation.x = time * 0.001;
  mesh.rotation.y = time * 0.001;

  renderer.render(scene, camera);
}
```
