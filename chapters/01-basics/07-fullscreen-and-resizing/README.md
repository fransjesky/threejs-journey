### Fullscreen canvas

If you noticed, so far I've been using `getBoundingClientRect()`. This is an approach to define the size of the canvas based on the canvas or parent wrapper's sizes, to make the renderer size dynamic to the canvas or parent wrapper's size. Using it allows the renderer to automatically adapt to the parent element's or canvas's defined dimensions, whether those are set via `CSS`, `Styled Components`, `Material UI`, `Tailwind`, or other styling method/framework.

However, if you want to make the canvas full screen to get the most immersive experience, it is better to use `window.innerWidth` and `window.innerHeight`. In this example, I'm defining the canvas element directly. This works well since we only have one canvas element; otherwise, you might want to use a class selector.

```css
html,
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  overflow: hidden;
}

canvas {
  position: fixed;
  top: 0;
  left: 0;
  outline: none;
}
```

### Responsive canvas

To ensure the renderer's canvas is responsive and provides a fully immersive experience across all screen sizes, we need to address at least three key areas:

1. Capturing and handling updated sizes.
2. Updating the camera's aspect ratio and projection matrix. | `camera.aspect` `camera.updateProjectionMatrix`
3. Updating the renderer's size. | `renderer.setSize`

We will be using vanilla JavaScript to implement this responsiveness.

```tsx
window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
```

While `setPixelRatio` is optional, it's recommended for consistent performance across various screen densities.
