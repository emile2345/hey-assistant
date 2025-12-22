// ============================================
// HEY Assistant — Avatar GLB (stable)
// Three.js ES Modules — Lovable compatible
// ============================================

import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.152.2/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.152.2/examples/jsm/loaders/GLTFLoader.js';

const canvas = document.getElementById('scene');

// === SCENE ===
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

// === CAMERA ===
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.set(0, 1.6, 3);

// === RENDERER ===
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: false,
  powerPreference: 'low-power',
  alpha: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// === LIGHTS ===
scene.add(new THREE.AmbientLight(0xffffff, 0.6));

const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(1, 2, 3);
scene.add(dirLight);

// === LOAD AVATAR ===
const loader = new GLTFLoader();
let avatar = null;

loader.load(
  './avatar.glb',
  (gltf) => {
    avatar = gltf.scene;

    // 🔧 Position & scale (CENTRÉ)
    avatar.position.set(0, 0, 0);
    avatar.scale.set(1, 1, 1);

    scene.add(avatar);
    console.log('✅ Avatar chargé et affiché');
  },
  (xhr) => {
    console.log(`⏳ Chargement ${(xhr.loaded / xhr.total * 100).toFixed(1)}%`);
  },
  (error) => {
    console.error('❌ Erreur avatar.glb', error);
  }
);

// === ANIMATION LOOP ===
function animate() {
  requestAnimationFrame(animate);

  if (avatar) {
    avatar.rotation.y += 0.005;
  }

  renderer.render(scene, camera);
}
animate();

// === RESIZE ===
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});










