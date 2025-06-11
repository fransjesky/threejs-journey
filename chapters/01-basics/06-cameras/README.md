### Custom controls (Vanilla JavaScript)

Here is one way to create custom controls on the camera using vanilla JavaScript.

```ts
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

camera.position.y = cursor.y * 5;
camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;
```

---

### Built-in controls (OrbitControls)

Three.js offers many built-in controls, and Orbit Controls is one of them that we will be using. To use it, we need to instantiate a variable using the OrbitControls class.

The OrbitControls class is part of those classes that are not available by default in the THREE variable. That decision helps to reduce the weight of the library.

The OrbitControls class may not be available in the THREE variable; it is still located in the dependencies folder. To import it, you must provide the path from inside the /node_modules/ folder, which is /three/examples/jsm/controls/OrbitControls.js:

```tsx
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
```

However, based on the Three.js documentation, you can import it like this:

```tsx
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
```

three/addons is merely an alias that points to examples/jsm. However, while this alias will still work at runtime (because it correctly points to examples/jsm), TypeScript doesn't recognize it by default. This is because three/addons isn't declared in the @types/three package or your tsconfig.json. So using three/addons will throw a TypeScript error.

To resolve this, there are two main solutions (actually more, but i am going to focus on the most easiest one):

1. Use the official import path: three/examples.
2. Declare the type for three/addons using a custom module declaration.

Here is how to do it:

```ts
// create file src/types/three-addons.d.ts
declare module "three/addons/controls/OrbitControls.js" {
  export * from "three/examples/jsm/controls/OrbitControls.js";
}
```

```ts
// include the custom declared types in tsconfig.json
{
  "compilerOptions": {
    "typeRoots": ["./node_modules/@types", "./src/types"]
  }
}
```

Now that we've imported it, here's how to use Orbit Controls:

```tsx
const controls = new OrbitControls(camera, canvas);
controls.target.add(mesh.position);
controls.enableDamping = true;
controls.autoRotate = true;

function animate() {
  controls.update(); // this is required for the damping and autoRotate
  renderer.render(scene, camera);
}
```
