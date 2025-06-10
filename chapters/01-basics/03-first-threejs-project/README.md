### Manually create canvas (Recommended)

You can create canvas manually and then later will select it to let the renderer render the webgl. You can use ID, classes or even the Canvas element itself as the selector (if there is only one canvas).

This is the most recommended method for rendering WebGL, as it gives you full control over the canvas, which is especially useful when integrating with existing DOM structures or applying custom styling and layouts.

```html
<!-- index.html -->
<canvas id="webgl"></canvas>
```

```ts
// script.ts
const canvas = document.getElementById("webgl") as HTMLCanvasElement;
if (!canvas) {
  throw new Error("Canvas element does not found");
}
```

---

### Three.js creates and appends the canvas

This method allow you to create canvas easily, however, you have less control over the canvas. Using this method usually ideal for demos or quick experiment.

```ts
const renderer = new THREE.WebGLRenderer();
document.body.appendChild(renderer.domElement);
```

---

### React Three Fiber's canvas

> [!IMPORTANT]  
> Using the `<Canvas />` component from React Three Fiber is exclusively applicable to React-based project.
> `<Canvas />` component cannot be used with vanilla Three.js.

In React apps, you don't manipulate the DOM manually, you use JSX:

```jsx
import { Canvas } from "@react-three/fiber";

function main() {
  return (
    <Canvas>
      {/* 3D content */}
    </Canvas>;
  )
}
```

Under the hood, React Three Fiber still use THREE.WebGLRenderer, but it abstracts away canvas creation and rendering logic. You can also customize canvas props via the `<Canvas />` component.
