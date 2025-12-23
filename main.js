// ✅ CORRECTION: URL COMPLÈTE pour Three.js
import * as THREE from 'https://unpkg.com/three@0.128.0/build/three.module.js';
// ✅ CORRECTION: URL COMPLÈTE pour GLTFLoader
import { GLTFLoader } from 'https://unpkg.com/three@0.128.0/examples/jsm/loaders/GLTFLoader.js';

// ============================================
// INITIALISATION
// ============================================
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xcccccc);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 1.5, 3);

// ============================================
// ÉCLAIRAGE ET HELPERS
// ============================================
const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 5);
scene.add(directionalLight);

// Grille et axes
const gridHelper = new THREE.GridHelper(10, 10, 0x000000, 0x888888);
scene.add(gridHelper);

const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);

// ============================================
// CHARGEMENT DE AVATAR.GLB
// ============================================
const loader = new GLTFLoader();
let avatar = null;

// Chemin RELATIF vers votre fichier local
const AVATAR_PATH = './avatar.glb';

loader.load(
    AVATAR_PATH,
    (gltf) => {
        console.log('✅ avatar.glb chargé avec succès!');
        document.getElementById('status').textContent = '✅ avatar.glb chargé!';

        avatar = gltf.scene;

        // Ajuster la taille et position
        avatar.scale.set(1, 1, 1);
        avatar.position.set(0, 0, 0);

        // Activer les ombres
        avatar.traverse((node) => {
            if (node.isMesh) {
                node.castShadow = true;
                node.receiveShadow = true;
            }
        });

        scene.add(avatar);
    },
    (xhr) => {
        const percent = Math.round((xhr.loaded / xhr.total) * 100);
        document.getElementById('status').textContent = `Chargement: ${percent}%`;
    },
    (error) => {
        console.error('❌ Erreur de chargement:', error);
        document.getElementById('status').textContent = '❌ Erreur de chargement - création avatar simple';

        // Créer un cube de secours
        const geometry = new THREE.BoxGeometry(1, 2, 0.5);
        const material = new THREE.MeshStandardMaterial({ color: 0x4CAF50 });
        avatar = new THREE.Mesh(geometry, material);
        scene.add(avatar);
    }
);

// ============================================
// ANIMATION
// ============================================
function animate() {
    requestAnimationFrame(animate);

    if (avatar) {
        avatar.rotation.y += 0.01;
    }

    renderer.render(scene, camera);
}

// Redimensionnement
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();