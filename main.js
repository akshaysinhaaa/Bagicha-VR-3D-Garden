import * as THREE from "three";
import { scene, setupScene } from "./modules/scene.js";
import { createPaintings } from "./modules/paintings.js";
import { createWalls } from "./modules/walls.js";
import { setupLighting } from "./modules/lighting.js";
import { setupFloor } from "./modules/floor.js";
import { createCeiling } from "./modules/ceiling.js";
import { createBoundingBoxes } from "./modules/boundingBox.js";
import { setupRendering } from "./modules/rendering.js";
import { setupEventListeners } from "./modules/eventListeners.js";
import { addObjectsToScene } from "./modules/sceneHelpers.js";
import { setupPlayButton } from "./modules/menu.js";
import { setupAudio } from "./modules/audioGuide.js";
import { clickHandling } from "./modules/clickHandling.js";
import { setupVR } from "./modules/VRSupport.js";
import { loadStatueModel } from "./modules/statue.js";
import { loadBenchModel } from "./modules/bench.js";
import { loadCeilingLampModel } from "./modules/ceilingLamp.js";

let { camera, controls, renderer } = setupScene();

setupAudio(camera);

const textureLoader = new THREE.TextureLoader();

const walls = createWalls(scene, textureLoader);


// const floor = setupFloor(scene);
const colorTexture = textureLoader.load(
    "grass/Grass004_4K-JPG_Color.jpg"
  );
  const displacementTexture = textureLoader.load(
    "grass/Grass004_4K-JPG_Displacement.jpg"
  );
  const normalTexture = textureLoader.load(
    "grass/Grass004_4K-JPG_NormalGL.jpg"
  );
  const roughnessTexture = textureLoader.load(
    "grass/Grass004_4K-JPG_Roughness.jpg"
  );
  const aoTexture = textureLoader.load(
    "grass/Grass004_4K-JPG_AmbientOcclusion.jpg"
  );

  // Set texture parameters
  colorTexture.wrapS = colorTexture.wrapT = THREE.RepeatWrapping;
  displacementTexture.wrapS = displacementTexture.wrapT = THREE.RepeatWrapping;
  normalTexture.wrapS = normalTexture.wrapT = THREE.RepeatWrapping;
  roughnessTexture.wrapS = roughnessTexture.wrapT = THREE.RepeatWrapping;
  aoTexture.wrapS = aoTexture.wrapT = THREE.RepeatWrapping;

  const planeGeometry = new THREE.PlaneGeometry(45, 45);
  const planeMaterial = new THREE.MeshStandardMaterial({
    map: colorTexture,
    displacementMap: displacementTexture,
    normalMap: normalTexture,
    roughnessMap: roughnessTexture,
    aoMap: aoTexture,
    displacementScale: 0.1,
    side: THREE.DoubleSide,
  });

  const floorPlane = new THREE.Mesh(planeGeometry, planeMaterial);

  floorPlane.rotation.x = Math.PI / 2;
  floorPlane.position.y = -Math.PI;

  scene.add(floorPlane);





// const ceiling = createCeiling(scene, textureLoader);
const ceilingGeometry  = new THREE.PlaneBufferGeometry(50, 50); 
const ceilingMaterial = new THREE.MeshBasicMaterial({
    color: '#141414',
});
const ceilingPlane = new THREE.Mesh(ceilingGeometry, ceilingMaterial);

ceilingPlane.rotation.x = Math.PI / 2
ceilingPlane.position.y = 11;

scene.add(ceilingPlane);


const paintings = createPaintings(scene, textureLoader);
const lighting = setupLighting(scene, paintings);

createBoundingBoxes(walls);
createBoundingBoxes(paintings);

addObjectsToScene(scene, paintings);

setupPlayButton(controls);

setupEventListeners(controls);

clickHandling(renderer, camera, paintings);

setupRendering(scene, camera, renderer, paintings, controls, walls);

loadStatueModel(scene);

loadBenchModel(scene);

loadCeilingLampModel(scene);

setupVR(renderer);
