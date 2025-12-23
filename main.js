// Import Three.js et GLTFLoader depuis unpkg
import * as THREE from 'https://unpkg.com/three@0.128.0/build/three.module.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.128.0/examples/jsm/loaders/GLTFLoader.js';

// ============================================
// CHARGEMENT DE AVATAR.GLB LOCAL
// ============================================

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xcccccc); // Fond gris clair

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.set(0, 1.6, 3);

// ============================================
// HELPERS VISUELS
// ============================================
const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);

const gridHelper = new THREE.GridHelper(10, 10, 0x000000, 0x666666);
gridHelper.position.y = 0;
scene.add(gridHelper);

// ============================================
// ÉCLAIRAGE FORT
// ============================================
const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
scene.add(ambientLight);

const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1.2);
directionalLight1.position.set(5, 8, 5);
directionalLight1.castShadow = true;
scene.add(directionalLight1);

const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight2.position.set(-5, 3, -5);
scene.add(directionalLight2);

const pointLight = new THREE.PointLight(0xffffff, 0.6);
pointLight.position.set(0, 4, 0);
scene.add(pointLight);

// ============================================
// FONCTIONS DE CHARGEMENT
// ============================================
function updateStatus(message) {
    document.getElementById('status').textContent = message;
    console.log(message);
}

function showLoading(show) {
    document.getElementById('loading').style.display = show ? 'block' : 'none';
}

// Fonction pour créer un avatar de secours si le GLB échoue
function createFallbackAvatar() {
    updateStatus("⚠️ Création d'un avatar de secours...");

    const group = new THREE.Group();

    // Corps simple
    const geometry = new THREE.BoxGeometry(0.5, 1.5, 0.3);
    const material = new THREE.MeshStandardMaterial({
        color: 0x4CAF50,
        metalness: 0.3,
        roughness: 0.4
    });
    const body = new THREE.Mesh(geometry, material);
    body.position.y = 0.75;
    group.add(body);

    // Tête
    const headGeometry = new THREE.SphereGeometry(0.2, 16, 16);
    const headMaterial = new THREE.MeshStandardMaterial({ color: 0xFFCC99 });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.y = 1.6;
    group.add(head);

    return group;
}

// ============================================
// CHARGEMENT DU FICHIER AVATAR.GLB LOCAL
// ============================================
const loader = new GLTFLoader();
let avatar = null;

// URL relative vers avatar.glb dans le même dossier
const AVATAR_PATH = './avatar.glb';

updateStatus("🔄 Début du chargement de avatar.glb...");
showLoading(true);

loader.load(
    AVATAR_PATH,

    // Succès
    function (gltf) {
        console.log("✅ avatar.glb chargé avec succès!");
        updateStatus("✅ avatar.glb chargé avec succès!");
        showLoading(false);

        avatar = gltf.scene;

        // Ajuster l'échelle si nécessaire
        avatar.scale.set(1, 1, 1);
        avatar.position.set(0, 0, 0);

        // Calculer la boîte englobante pour centrer et ajuster la caméra
        const box = new THREE.Box3().setFromObject(avatar);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        console.log("Taille du modèle:", size);
        console.log("Centre du modèle:", center);

        // Centrer le modèle
        avatar.position.x -= center.x;
        avatar.position.y -= center.y;
        avatar.position.z -= center.z;

        // Activer les ombres
        avatar.traverse(function (node) {
            if (node.isMesh) {
                node.castShadow = true;
                node.receiveShadow = true;
            }
        });

        scene.add(avatar);

        // Ajuster la caméra selon la taille du modèle
        const maxDim = Math.max(size.x, size.y, size.z);
        camera.position.set(0, maxDim * 0.8, maxDim * 1.5);
        camera.lookAt(0, maxDim * 0.5, 0);

        updateStatus(`✅ Avatar chargé - Taille: ${size.x.toFixed(2)}x${size.y.toFixed(2)}x${size.z.toFixed(2)}`);
    },

    // Progression
    function (xhr) {
        const percent = Math.round((xhr.loaded / xhr.total) * 100);
        updateStatus(`🔄 Chargement: ${percent}%`);
        console.log(`Chargement: ${percent}%`);
    },

    // Erreur
    function (error) {
        console.error("❌ Erreur de chargement de avatar.glb:", error);
        updateStatus("❌ Erreur de chargement, création d'un avatar de secours...");
        showLoading(false);

        // Créer un avatar de secours
        avatar = createFallbackAvatar();
        scene.add(avatar);
        updateStatus("✅ Avatar de secours créé");
    }
);

// ============================================
// ANIMATION
// ============================================
function animate() {
    requestAnimationFrame(animate);

    // Si l'avatar est chargé, le faire tourner lentement
    if (avatar) {
        avatar.rotation.y += 0.01;
    }

    renderer.render(scene, camera);
}

// ============================================
// GESTION DU REDIMENSIONNEMENT
// ============================================
window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// ============================================
// DÉMARRAGE
// ============================================
animate();

console.log("🚀 Démarrage du chargement de avatar.glb");
console.log("📁 Chemin du fichier:", AVATAR_PATH);
console.log("💡 Assurez-vous que avatar.glb est dans le même dossier que index.html");