### Transformation

There are 4 properties to transform objects in our scene

- position (to move the object)
- scale (to resize the object)
- rotation (to rotate the object)
- quaternion (to also rotate the object; more about that later)

---

### Position objects

The position possesses 3 essential properties, which are x, y, and z. Those are the 3 necessary axes to position something in a 3D space.

The position property is not any object. It's an instance of the **Vector3** class. While this class has an `x`, a `y`, and a `z` property, it also has many useful methods.

```ts
// You can get the length of a vector:
console.log(mesh.position.length());

// You can get the distance from another Vector3
// (make sure to use this code after creating the camera):
console.log(mesh.position.distanceTo(camera.position));

// You can normalize its values
// (meaning that you will reduce the length of the vector to 1 unit but preserve its direction):
console.log(mesh.position.normalize());

// To change the values, instead of changing x, y and z separately,
// you can also use the set(...) method:
mesh.position.set(0.7, -0.6, 1);
```

### Scale objects

`scale` is also a **Vector3**. By default, `x`, `y` and `z` are equal to 1, meaning that the object has no scaling applied. If you put 0.5 as a value, the object will be half of its size on this axis, and if you put 2 as a value, it will be twice its original size on this axis.

While you can use negative values, it might generate bugs later on because axes won't be oriented in the logical direction. Try to avoid doing it.

### Rotate objects

Rotation is a little more troublesome than position and scale. There are two ways of handling a rotation.

You can use the self-evident rotation property, but you can also use the less obvious quaternion property. Three.js supports both, and updating one will automatically update the other. It's just a matter of which one you prefer.

### Rotation

The `rotation` property also has `x`, `y`, and `z` properties, but instead of a Vector3, it's a **Euler**. When you change the `x`, `y`, and `z` properties of a **Euler**, you can imagine putting a stick through your object's center in the axis's direction and then rotating that object on that stick.

- If you spin on the y axis, you can picture it like a carousel.
- If you spin on the x axis, you can imagine that you are rotating the wheels of a car you'd be in.
- And if you rotate on the z axis, you can imagine that you are rotating the propellers in front of an aircraft you'd be in.

The value of these axes is expressed in radians. If you want to achieve half a rotation, you'll have to write something like 3.14159... You probably recognize that number as π. In native JavaScript, you can end up with an approximation of π using `Math.PI`.

```ts
mesh.rotation.x = Math.PI * 0.25;
mesh.rotation.y = Math.PI * 0.25;
```

When you combine those rotations, you might end up with strange results. Why? Because, while you rotate the `x` axis, you also change the other axes' orientation. The rotation applies in the following order: `x`, `y`, and then `z`. That can result in weird behaviors like one named **gimbal lock** when one axis has no more effect, all because of the previous ones.

We can change this order by using the `reorder(...)` method `object.rotation.reorder('YXZ')`

While **Euler** is easier to understand, this order problem can cause issues. And this is why most engines and 3D softwares use another solution named **Quaternion**.

### Quaternion

The quaternion property also expresses a rotation, but in a more mathematical way, which solves the order problem. We will not cover how quaternions work in this lesson but keep in mind that the quaternion updates when you change the rotation. This means that you can use any one of the two as you please.

---

### Axes Helper

Before we go any further, as you can see, positioning things in space can be a real challenge. Knowing where each axis is oriented is complicated especially when we start to move the camera.

One good solution is to use the Three.js `AxesHelper`.

The `AxesHelper` will display 3 lines corresponding to the x, y and z axes, each one starting at the center of the scene and going in the corresponding direction.

To create the `AxesHelper`, instantiate it and add it to the scene right after instantiating that scene. You can specify the length of the lines as the only parameter.

```ts
const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);
```
