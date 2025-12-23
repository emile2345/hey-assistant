// Import Three.js depuis unpkg (ES Module)
import * as THREE from 'https://unpkg.com/three@0.128.0/build/three.module.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.128.0/examples/jsm/loaders/GLTFLoader.js';

// ============================================
// OPTION 1 : Utiliser votre avatar spécifique
// ============================================
// Votre avatar ID : 64bfa15f0e72c63d7c3934a6
// Format correct de l'URL Ready Player Me :
const AVATAR_ID = '64bfa15f0e72c63d7c3934a6';
const AVATAR_URL = `https://models.readyplayer.me/${AVATAR_ID}.glb`;

// ============================================
// OPTION 2 : Avatar de test Ready Player Me (fallback)
// ============================================
const FALLBACK_AVATAR_URL = 'https://models.readyplayer.me/658c67008e5f2e1c8f8867df.glb';

// ============================================
// OPTION 3 : Avatar simple depuis CDN Three.js (si les autres échouent)
// ============================================
const SIMPLE_AVATAR_URL = 'https://cdn.jsdelivr.net/gh/mrdoob/three.js@dev/examples/models/gltf/DamagedHelmet/glTF/DamagedHelmet.gltf';

console.log('🚀 Tentative de chargement de l\'avatar Ready Player Me...');
console.log('URL principale:', AVATAR_URL);
console.log('URL de secours:', FALLBACK_AVATAR_URL);

// Initialisation
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xcccccc); // Fond gris clair

const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

// Caméra
const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.set(0, 1.6, 3);

// Helpers visuels
const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);

const gridHelper = new THREE.GridHelper(10, 10, 0x000000, 0x666666);
gridHelper.position.y = 0;
scene.add(gridHelper);

// Éclairage important
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

// Fonction pour charger un avatar
function loadAvatar(url, attempt = 1) {
    const loader = new GLTFLoader();
    const statusEl = document.getElementById('status');

    statusEl.innerHTML = `Chargement de l'avatar (tentative ${attempt}/3)...`;
    document.getElementById('loading').style.display = 'block';

    return new Promise((resolve, reject) => {
        loader.load(
            url,
            (gltf) => {
                console.log(`✅ Avatar chargé depuis: ${url}`);
                statusEl.innerHTML = '✅ Avatar chargé avec succès!';
                document.getElementById('loading').style.display = 'none';
                resolve(gltf);
            },
            (xhr) => {
                const percent = Math.round((xhr.loaded / xhr.total) * 100);
                statusEl.innerHTML = `Chargement: ${percent}%`;
                console.log(`Chargement: ${percent}%`);
            },
            (error) => {
                console.error(`❌ Erreur avec ${url}:`, error);
                reject(error);
            }
        );
    });
}

// Fonction principale pour afficher l'avatar
async function initAvatar() {
    try {
        // Essayer d'abord avec votre avatar
        const gltf = await loadAvatar(AVATAR_URL, 1);
        setupAvatar(gltf);
    } catch (error1) {
        console.log('Premier essai échoué, tentative avec avatar de secours...');

        try {
            // Essayer avec l'avatar de secours Ready Player Me
            const gltf = await loadAvatar(FALLBACK_AVATAR_URL, 2);
            setupAvatar(gltf);
        } catch (error2) {
            console.log('Deuxième essai échoué, tentative avec modèle simple...');

            try {
                // En dernier recours, utiliser un modèle simple
                const gltf = await loadAvatar(SIMPLE_AVATAR_URL, 3);
                setupAvatar(gltf);
            } catch (error3) {
                console.error('Tous les essais ont échoué');
                document.getElementById('status').innerHTML =
                    '❌ Impossible de charger un avatar. Vérifiez la console.';
                document.getElementById('loading').style.display = 'none';

                // Créer un cube de secours pour confirmer que Three.js fonctionne
                createFallbackGeometry();
            }
        }
    }
}

function setupAvatar(gltf) {
    const avatar = gltf.scene;

    // Ajuster la position et l'échelle
    avatar.position.set(0, 0, 0);
    avatar.scale.set(1, 1, 1);

    // Activer les ombres
    avatar.traverse((node) => {
        if (node.isMesh) {
            node.castShadow = true;
            node.receiveShadow = true;

            // Améliorer l'apparence
            if (node.material) {
                node.material.metalness = 0.1;
                node.material.roughness = 0.8;
            }
        }
    });

    scene.add(avatar);

    // Centrer la caméra sur l'avatar
    const box = new THREE.Box3().setFromObject(avatar);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());

    console.log(`Avatar chargé - Taille:`, size);
    console.log(`Avatar chargé - Centre:`, center);

    // Animation
    function animate() {
        requestAnimationFrame(animate);

        // Rotation lente pour visualisation
        avatar.rotation.y += 0.005;

        renderer.render(scene, camera);
    }

    animate();
}

// Géométrie de secours (si tout échoue)
function createFallbackGeometry() {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({
        color: 0xff5555,
        metalness: 0.3,
        roughness: 0.4
    });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(0, 0.5, 0);
    scene.add(cube);

    // Ajouter un message d'erreur visible
    const statusEl = document.getElementById('status');
    statusEl.innerHTML = '⚠️ Avatar non chargé - Affichage d\'un cube de test';

    // Animation
    function animate() {
        requestAnimationFrame(animate);
        cube.rotation.y += 0.01;
        cube.rotation.x += 0.005;
        renderer.render(scene, camera);
    }

    animate();
}

// Gestion du redimensionnement
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Démarrer
initAvatar();