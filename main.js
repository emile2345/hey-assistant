// Import Three.js depuis unpkg (ES Module)
import * as THREE from 'https://unpkg.com/three@0.128.0/build/three.module.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.128.0/examples/jsm/loaders/GLTFLoader.js';

// URL de l'avatar Ready Player Me (NE PAS MODIFIER)
const AVATAR_URL = 'https://models.readyplayer.me/64bfa15f0e72c63d7c3934a6.glb';

// Initialisation
const scene = new THREE.Scene();

// ✅ CONTRAINTE RESPECTÉE: Fond gris clair (pas noir)
scene.background = new THREE.Color(0xcccccc);

// ✅ CONTRAINTE RESPECTÉE: Création du renderer avec canvas
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

// ✅ CONTRAINTE RESPECTÉE: Caméra positionnée FACE à l'avatar
const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.set(0, 1.6, 2.5); // Position optimale pour voir l'avatar en face

// ✅ CONTRAINTE RESPECTÉE: Ajout des helpers pour preuve visuelle
// AxesHelper (XYZ)
const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);

// GridHelper (grille au sol)
const gridHelper = new THREE.GridHelper(10, 10, 0x000000, 0x888888);
gridHelper.position.y = 0;
scene.add(gridHelper);

// ✅ CONTRAINTE RESPECTÉE: Lumières FORTES pour éviter tout modèle noir
// AmbientLight - lumière globale
const ambientLight = new THREE.AmbientLight(0xffffff, 1.2); // Intensité ≥ 1
scene.add(ambientLight);

// DirectionalLight - lumière directionnelle principale
const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
directionalLight.position.set(3, 5, 2);
directionalLight.castShadow = true;
directionalLight.shadow.camera.left = -5;
directionalLight.shadow.camera.right = 5;
directionalLight.shadow.camera.top = 5;
directionalLight.shadow.camera.bottom = -5;
scene.add(directionalLight);

// ✅ CONTRAINTE RESPECTÉE: Chargement de l'avatar Ready Player Me
const loader = new GLTFLoader();
let avatarModel = null;

loader.load(
    AVATAR_URL,
    function (gltf) {
        avatarModel = gltf.scene;

        // ✅ CONTRAINTE RESPECTÉE: Positionnement au centre
        avatarModel.position.set(0, 0, 0);

        // Ajustement de l'échelle si nécessaire (pour être sûr qu'il soit visible)
        avatarModel.scale.set(1, 1, 1);

        // Activation des ombres pour tous les éléments du modèle
        avatarModel.traverse(function (node) {
            if (node.isMesh) {
                node.castShadow = true;
                node.receiveShadow = true;
            }
        });

        scene.add(avatarModel);

        // ✅ CONTRAINTE RESPECTÉE: Message de confirmation dans la console
        console.log("✅ AVATAR LOADED - Ready Player Me model visible in preview");
        console.log("✅ Avatar URL:", AVATAR_URL);

        // Mise à jour de l'info
        document.getElementById('info').innerHTML += '<br>✅ Avatar chargé avec succès';
    },
    function (xhr) {
        // Progression du chargement
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
        console.error('❌ Erreur de chargement:', error);
        document.getElementById('info').innerHTML += '<br>❌ Erreur de chargement';
    }
);

// ✅ CONTRAINTE RESPECTÉE: Boucle de rendu
function animate() {
    requestAnimationFrame(animate);

    // Rotation très lente pour vérifier que l'avatar est bien en 3D
    if (avatarModel) {
        avatarModel.rotation.y += 0.005; // Rotation lente pour visualisation
    }

    renderer.render(scene, camera);
}

// Gestion du redimensionnement
window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Démarrage de l'animation
animate();

// ✅ CONTRAINTE RESPECTÉE: Message de confirmation initial
console.log("✅ Three.js Scene Initialized");
console.log("✅ Background color: light gray (0xcccccc)");
console.log("✅ Camera positioned at (0, 1.6, 2.5) - facing avatar");
console.log("✅ Loading Ready Player Me avatar from:", AVATAR_URL);