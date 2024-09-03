import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader";
import { GUI } from "lil-gui";

export const loadBenchModel = (scene) => {
  const loader = new GLTFLoader();
  const gui = new GUI();

  loader.load(
    "../public/models/bench_2/scene.gltf",
    (gltf) => {
      const bench = gltf.scene;

      bench.traverse((child) => {
        if (child.isMesh) {
          console.log("Materials:", child.material);
          console.log("Map Material", child.material.map);
          console.log("Material Name:", child.material.name);
          console.log("Material Type:", child.material.type);
          console.log("UV attributes:", child.geometry.attributes.uv);
        }
      });

      // Default Position and Scale
      bench.position.set(0, 0, -8);
      bench.rotation.set(0, 0, 0);
      bench.scale.set(1, 1, 1);

      // Add the bench to the scene
      scene.add(bench);
    },
    undefined,
    (error) => {
      console.error("An error occurred while loading the bench model.", error);
    }
  );
};
