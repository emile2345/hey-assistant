// ============================================
// HEY Assistant — Three.js ES Modules (Browser)
// GitHub Pages + WebView Android OK
// ============================================

// ✅ IMPORTS AVEC URL COMPLÈTE (PAS "three")
import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.160.0/examples/jsm/loaders/GLTFLoader.js';

const canvas = document.getElementById('scene');

// === SCÈNE ===
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

// === CAMÉRA ===
const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.set(0, 1.4, 2.5);

// === RENDERER ===
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// === LUMIÈRES ===
scene.add(new THREE.AmbientLight(0xffffff, 0.6));

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(2, 5, 2);
scene.add(light);

// === TEST CUBE (sécurité visuelle) ===
const cube = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshStandardMaterial({ color: 0x40e0d0 })
);
scene.add(cube);

// === AVATAR ===
const loader = new GLTFLoader();

loader.load(
  './avatar.glb',
  (gltf) => {
    scene.remove(cube);

    const avatar = gltf.scene;
    avatar.position.set(0, 0, 0);
    avatar.scale.set(1, 1, 1);

    scene.add(avatar);
    console.log('✅ Avatar chargé');
  },
  undefined,
  (error) => {
    console.error('❌ Erreur avatar', error);
  }
);

// === ANIMATION ===
function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();

// === RESIZE ===
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});







