### Buffer Geometry

As you already know, **Three.js** provides built-in geometries such as `BoxGeometry` and `SphereGeometry`. However, you might want to create your own geometry by defining the positions of vertices yourself. To do that, you can use `BufferGeometry`, which is also provided by Three.js, and here is how to do it:

1. Define the Three.js `BufferGeometry`

```tsx
const geometry = new THREE.BufferGeometry();
```

2. Using `Float32Array` (a built-in JavaScript typed array) to store the positions for each vertex

```tsx
const positionsArray = new Float32Array([0, 0, 0, 0, 1, 0, 1, 0, 0]);
```

Based on the example above, the array length is 9. Remember, each vertex requires three pieces of data to define its position (`x`, `y`, and `z`). Since GPUs render triangles, which are composed of three vertices, the `positionsArray` has a total length of 9.

3. Define the BufferAttribute

Don't get confused here. In the previous step, we merely defined an array. Three.js, however, doesn't yet know what that array represents. So, using the `positionsArray` we just created, we're now going to define it to create the position attribute for each vertex.

```tsx
const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3);
```

In the code above, we pass the `Float32Array` we created to `BufferAttribute` and then specify a data set length of `3`. This '3' indicates that each vertex's position requires three values (`x`, `y`, and `z`). If you were defining other attributes, like `UV coordinates`, you would set this value to 2, as UV coordinates only require two values.

4. Set the position attribute for BufferGeometry

Now that we have defined the positions for each vertex using `BufferAttribute`, we need to send this data to `BufferGeometry`.

```tsx
geometry.setAttribute("position", positionsAttribute);
```

Here is the whole code to help you see and understand this concept clearly:

```tsx
const geometry = new THREE.BufferGeometry();
const material = new THREE.MeshNormalMaterial({
  wireframe: true,
});
const positionsArray = new Float32Array([0, 0, 0, 0, 1, 0, 1, 0, 0]);
const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3);

geometry.setAttribute("position", positionsAttribute);
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
```

### Random factor

Rather than filling the data manually, we can make it more dynamic by adding a random factor. First, we define how many triangles we want to render (see the count variable). Then, we pass this into a `Float32Array` and multiply it by `3`, because each vertex requires a data set of three values for its position (`x`, `y`, and `z`). We then multiply this by `3` again, as each triangle requires `three vertices`.

Next, using a `for loop`, we define each array index with a random value (`Math.random()`). To center these values, we subtract `0.5` (since Math.random() returns a value between 0 and 1). To give it more amplitude, we can then multiply this value (in the example, i multiply it by 2).

Finally, we send the `positionsAttribute`, which we've filled with random values, to the geometry as its position attribute.

```tsx
const geometry = new THREE.BufferGeometry();
const material = new THREE.MeshNormalMaterial({
  wireframe: true,
});
const count = 50;
const positionsArray = new Float32Array(count * 3 * 3);
const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3);

for (let i = 0; i < count * 3 * 3; i++) {
  positionsArray[i] = (Math.random() - 0.5) * 2;
}

geometry.setAttribute("position", positionsAttribute);
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
```

> [!IMPORTANT]  
> Be careful when defining the amount of triangles. An extreme number, such as a million, can be very taxing on your GPU and might exceed its capabilities, potentially leading to unexpected issues
