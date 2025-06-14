### UI Debugger: lil-gui

Working with **WebGL** or **Three.js** can be much more organized if we have the ability to tweak parameters. There are many Debug UI libraries available that can help us achieve the desired results and simultaneously assist with debugging. Some of these libraries include `dat.GUI`, `lil-gui`, `Tweakpane`, and many others.

`Dat.GUI` was once the most popular library used by the community for creative projects. However, it is no longer maintained, and most developers have moved on to `lil-gui` or `Tweakpane`. Reflecting current popularity and today's standards, Three.js Journey now uses lil-gui, whereas it previously used dat.GUI.

To install and use `lil-gui`:

```sh
npm install lil-gui@latest --save-dev
```

> [!IMPORTANT]  
> Personally, I prefer to keep the debug UI available only in the development environment. That's why I installed it with --save-dev, making it a devDependency. However, if you need to show it to your client or designer so they can tweak it on staging (UAT) or even in production, we can hide the panel and reveal it by pressing a specific key.

Here's how to instantiate it and also add a specific key (h key) to toggle the panel's visibility:

```tsx
import GUI from "lil-gui";

const gui = new GUI({
  width: 300,
  title: "Nice debug UI",
  closeFolders: false,
});
gui.hide();

window.addEventListener("keydown", (event) => {
  if (event.key == "h") gui.show(gui._hidden);
});
```

### Adding tweak config

I recommend reading the documentation if you want to add specific configurations to tweak from the debug UI, as I'm only covering some important configurations and key concept on how to use the lil-gui here.

1. When adding configurations, the target must be an object. If the value you wish to configure is not inherently an object, it's best practice to encapsulate it within a custom object and then adjust its value through that intermediary.

```tsx
interface DebugType {
  color: string;
  spin: () => void;
  subdivision: number;
}

const debugObj: DebugType = {
  color: "#90b4ff",
  spin: () => {
    gsap.to(mesh.rotation, { y: mesh.rotation.y + Math.PI * 2 });
  },
  subdivision: 1,
};
```

2. Best practice for adding color tweak configurations.

```tsx
interface DebugType {
  color: string;
}

const debugObj: DebugType = {
  color: "#90b4ff",
};

const material = new THREE.MeshBasicMaterial({
  color: debugObj.color,
});

gui
  .addColor(debugObj, "color")
  .onChange((value: string) => {
    material.color.set(value);
  })
  .name("tweak color");
```

3. Tweaking geometry

Sometimes, when working with Three.js, not all configurations can be applied directly using a debug UI, for example, with Geometry. Here is an example of how to tweak the subdivision for geometry.

```tsx
interface DebugType {
  subdivision: number;
}

const debugObj: DebugType = {
  subdivision: 1,
};

const geometry = new THREE.BoxGeometry(1, 1, 1);

gui
  .add(debugObj, "subdivision")
  .min(1)
  .max(20)
  .step(1)
  .onChange(() => {
    mesh.geometry.dispose();
    mesh.geometry = new THREE.BoxGeometry(
      1,
      1,
      1,
      debugObj.subdivision,
      debugObj.subdivision,
      debugObj.subdivision,
    );
  })
  .name("tweak subdivision");
```

It's really important to dispose of existing geometry when making changes to it. Even if the geometry doesn't appear duplicated, by default, it's still saved somewhere in GPU memory. Changing things without disposing of the existing geometry you're modifying will greatly impact performance.

4. How to organize tweak configurations

In lil-gui, you can use a method to create folders, which allows you to categorize configurations. This is a good practice to keep your debug UI panel clean, especially as projects grow larger and configurations are likely to increase.

```tsx
const objTweak = gui.addFolder("Object Tweaks");
```

Then, instead of using gui to create tweaks, use the objTweak variable:

```tsx
objTweak.add(mesh.position, "y", -3, 3, 0.01).name("elevation");
objTweak
  .add(debugObj, "subdivision")
  .min(1)
  .max(20)
  .step(1)
  .onChange(() => {
    mesh.geometry.dispose();
    mesh.geometry = new THREE.BoxGeometry(
      1,
      1,
      1,
      debugObj.subdivision,
      debugObj.subdivision,
      debugObj.subdivision,
    );
  })
  .name("subdivision");

objTweak.add(mesh, "visible").name("show cube?");
objTweak.add(material, "wireframe").name("show wireframe?");
objTweak
  .addColor(debugObj, "color")
  .onChange((value: string) => {
    material.color.set(value);
  })
  .name("color");
objTweak.add(debugObj, "spin").name("Spin Cube!");
```
