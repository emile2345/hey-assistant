// ============================================
// Hey Assistant - Ready Player Me Avatar
// Compatible GitHub Pages + WebView Android
// ============================================

import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.160.0/examples/jsm/loaders/GLTFLoader.js';

// === URL AVATAR ===
const AVATAR_URL = 'https://models.readyplayer.me/64bfa15f0e72c63d7c3934a6.glb';

// === INITIALISATION ===
const canvas = document.getElementById('scene');
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x1a1a2e);

// === CAMÉRA ===
const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    100
);
// Position pour voir un avatar humanoïde en entier
camera.position.set(0, 1, 3);
camera.lookAt(0, 1, 0);

// === RENDERER ===
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    powerPreference: 'low-power'
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;

// === ÉCLAIRAGE ===
// Lumière ambiante pour éclairer uniformément
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

// Lumière directionnelle principale (face)
const frontLight = new THREE.DirectionalLight(0xffffff, 1);
frontLight.position.set(0, 2, 3);
scene.add(frontLight);

// Lumière directionnelle secondaire (arrière)
const backLight = new THREE.DirectionalLight(0xffffff, 0.4);
backLight.position.set(0, 1, -2);
scene.add(backLight);

// === CHARGEMENT AVATAR ===
const loader = new GLTFLoader();

loader.load(
    AVATAR_URL,
    (gltf) => {
        const avatar = gltf.scene;

        // Centrer l'avatar
        avatar.position.set(0, 0, 0);
        avatar.scale.set(1, 1, 1);

        scene.add(avatar);
        console.log('Avatar chargé avec succès');
    },
    (progress) => {
        const percent = (progress.loaded / progress.total * 100).toFixed(0);
        console.log(`Chargement: ${percent}%`);
    },
    (error) => {
        console.error('Erreur de chargement:', error);
    }
);

// === BOUCLE DE RENDU ===
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

// === GESTION DU RESIZE ===
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
