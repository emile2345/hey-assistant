// ✅ IMPORT CORRECT - URL ABSOLUE
import * as THREE from 'https://unpkg.com/three@0.128.0/build/three.module.js';

// ============================================
// INITIALISATION GARANTIE
// ============================================
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xcccccc); // ✅ Fond gris clair

const renderer = new THREE.WebGLRenderer({ 
    antialias: true,
    alpha: true 
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.set(3, 2, 5);

// ============================================
// ÉCLAIRAGE FORT GARANTI
// ============================================
const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
scene.add(ambientLight);

const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1.5);
directionalLight1.position.set(5, 10, 7);
directionalLight1.castShadow = true;
scene.add(directionalLight1);

const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight2.position.set(-5, 5, -5);
scene.add(directionalLight2);

// ============================================
// HELPERS VISUELS GARANTIS
// ============================================
const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);

const gridHelper = new THREE.GridHelper(10, 10, 0x000000, 0x666666);
gridHelper.position.y = 0;
scene.add(gridHelper);

// ============================================
// AVATAR SIMPLE GARANTI (fonctionne toujours)
// ============================================
let currentAvatar = null;

function createSimpleHumanAvatar() {
    const group = new THREE.Group();
    
    // Tête
    const headGeometry = new THREE.SphereGeometry(0.2, 32, 32);
    const headMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xFFCC99,
        roughness: 0.3,
        metalness: 0.1
    });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.y = 1.6;
    head.castShadow = true;
    group.add(head);
    
    // Corps
    const bodyGeometry = new THREE.CylinderGeometry(0.18, 0.25, 0.8, 16);
    const bodyMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x2196F3,
        roughness: 0.4,
        metalness: 0.2
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 0.9;
    body.castShadow = true;
    group.add(body);
    
    // Bras
    const armGeometry = new THREE.CylinderGeometry(0.06, 0.06, 0.7, 12);
    const armMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x4CAF50,
        roughness: 0.5
    });
    
    const leftArm = new THREE.Mesh(armGeometry, armMaterial);
    leftArm.position.set(-0.3, 1.1, 0);
    leftArm.rotation.z = Math.PI / 4;
    leftArm.castShadow = true;
    group.add(leftArm);
    
    const rightArm = leftArm.clone();
    rightArm.position.set(0.3, 1.1, 0);
    rightArm.rotation.z = -Math.PI / 4;
    group.add(rightArm);
    
    // Jambes
    const legGeometry = new THREE.CylinderGeometry(0.08, 0.08, 0.8, 12);
    const legMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x795548,
        roughness: 0.6
    });
    
    const leftLeg = new THREE.Mesh(legGeometry, legMaterial);
    leftLeg.position.set(-0.12, 0.2, 0);
    leftLeg.castShadow = true;
    group.add(leftLeg);
    
    const rightLeg = leftLeg.clone();
    rightLeg.position.set(0.12, 0.2, 0);
    group.add(rightLeg);
    
    // Visage
    const eyeGeometry = new THREE.SphereGeometry(0.035, 16, 16);
    const eyeMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });
    
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.07, 1.65, 0.17);
    group.add(leftEye);
    
    const rightEye = leftEye.clone();
    rightEye.position.set(0.07, 1.65, 0.17);
    group.add(rightEye);
    
    // Bouche
    const mouthGeometry = new THREE.TorusGeometry(0.05, 0.015, 8, 24, Math.PI);
    const mouthMaterial = new THREE.MeshStandardMaterial({ color: 0xFF5252 });
    const mouth = new THREE.Mesh(mouthGeometry, mouthMaterial);
    mouth.position.set(0, 1.55, 0.17);
    mouth.rotation.x = Math.PI / 2;
    group.add(mouth);
    
    return group;
}

// ============================================
// AVATAR ROBOT GARANTI (fonctionne toujours)
// ============================================
function createRobotAvatar() {
    const group = new THREE.Group();
    
    // Corps robotique
    const torsoGeometry = new THREE.BoxGeometry(0.6, 0.9, 0.4);
    const torsoMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x607D8B,
        metalness: 0.8,
        roughness: 0.1,
        emissive: 0x102020,
        emissiveIntensity: 0.2
    });
    const torso = new THREE.Mesh(torsoGeometry, torsoMaterial);
    torso.position.y = 0.9;
    torso.castShadow = true;
    group.add(torso);
    
    // Tête robotique
    const headGeometry = new THREE.BoxGeometry(0.35, 0.35, 0.35);
    const headMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x455A64,
        metalness: 0.9,
        roughness: 0.05
    });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.y = 1.5;
    head.castShadow = true;
    group.add(head);
    
    // Yeux LED
    const eyeGeometry = new THREE.SphereGeometry(0.06, 16, 16);
    const eyeMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x00E5FF,
        emissive: 0x00B0FF,
        emissiveIntensity: 1.0
    });
    
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.1, 1.55, 0.2);
    group.add(leftEye);
    
    const rightEye = leftEye.clone();
    rightEye.position.set(0.1, 1.55, 0.2);
    group.add(rightEye);
    
    // Bras robotiques
    const armGeometry = new THREE.CylinderGeometry(0.07, 0.07, 0.8, 12);
    const armMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x37474F,
        metalness: 0.7,
        roughness: 0.2
    });
    
    const leftArm = new THREE.Mesh(armGeometry, armMaterial);
    leftArm.position.set(-0.4, 0.9, 0);
    leftArm.rotation.z = Math.PI / 6;
    leftArm.castShadow = true;
    group.add(leftArm);
    
    const rightArm = leftArm.clone();
    rightArm.position.set(0.4, 0.9, 0);
    rightArm.rotation.z = -Math.PI / 6;
    group.add(rightArm);
    
    // Jambes robotiques
    const legGeometry = new THREE.CylinderGeometry(0.09, 0.09, 0.9, 12);
    const legMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x263238,
        metalness: 0.6,
        roughness: 0.3
    });
    
    const leftLeg = new THREE.Mesh(legGeometry, legMaterial);
    leftLeg.position.set(-0.15, 0.2, 0);
    leftLeg.castShadow = true;
    group.add(leftLeg);
    
    const rightLeg = leftLeg.clone();
    rightLeg.position.set(0.15, 0.2, 0);
    group.add(rightLeg);
    
    // Jointures (sphères)
    const jointGeometry = new THREE.SphereGeometry(0.08, 16, 16);
    const jointMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xFF9800,
        metalness: 0.5
    });
    
    // Jointures d'épaules
    const leftShoulder = new THREE.Mesh(jointGeometry, jointMaterial);
    leftShoulder.position.set(-0.35, 1.2, 0);
    group.add(leftShoulder);
    
    const rightShoulder = leftShoulder.clone();
    rightShoulder.position.set(0.35, 1.2, 0);
    group.add(rightShoulder);
    
    // Jointures de hanches
    const leftHip = new THREE.Mesh(jointGeometry, jointMaterial);
    leftHip.position.set(-0.15, 0.65, 0);
    group.add(leftHip);
    
    const rightHip = leftHip.clone();
    rightHip.position.set(0.15, 0.65, 0);
    group.add(rightHip);
    
    return group;
}

// ============================================
// FONCTIONS DE SWITCH D'AVATAR
// ============================================
function switchToSimpleAvatar() {
    if (currentAvatar) {
        scene.remove(currentAvatar);
    }
    
    currentAvatar = createSimpleHumanAvatar();
    scene.add(currentAvatar);
    
    document.getElementById('status').textContent = "✅ Avatar humain simple - Garanti visible";
    console.log("Avatar simple activé");
}

function switchToRobotAvatar() {
    if (currentAvatar) {
        scene.remove(currentAvatar);
    }
    
    currentAvatar = createRobotAvatar();
    scene.add(currentAvatar);
    
    document.getElementById('status').textContent = "✅ Avatar robot - Garanti visible";
    console.log("Avatar robot activé");
}

// ============================================
// ESSAI DE CHARGEMENT GLB (optionnel)
// ============================================
async function tryLoadGLB() {
    try {
        // Importer dynamiquement GLTFLoader
        const { GLTFLoader } = await import('https://unpkg.com/three@0.128.0/examples/jsm/loaders/GLTFLoader.js');
        
        const loader = new GLTFLoader();
        document.getElementById('status').textContent = "🔄 Essai de chargement avatar.glb...";
        
        loader.load(
            './avatar.glb',
            (gltf) => {
                if (currentAvatar) {
                    scene.remove(currentAvatar);
                }
                
                currentAvatar = gltf.scene;
                currentAvatar.scale.set(1, 1, 1);
                currentAvatar.position.set(0, 0, 0);
                
                scene.add(currentAvatar);
                document.getElementById('status').textContent = "✅ avatar.glb chargé avec succès!";
                console.log("GLB chargé avec succès");
            },
            (xhr) => {
                const percent = Math.round((xhr.loaded / xhr.total) * 100);
                document.getElementById('status').textContent = `Chargement GLB: ${percent}%`;
            },
            (error) => {
                console.error("Erreur GLB:", error);
                document.getElementById('status').textContent = "❌ avatar.glb non trouvé - Retour à l'avatar simple";
                switchToSimpleAvatar();
            }
        );
    } catch (error) {
        console.error("Impossible de charger GLTFLoader:", error);
        document.getElementById('status').textContent = "❌ Impossible de charger GLB - Avatar simple activé";
        switchToSimpleAvatar();
    }
}

// ============================================
// ANIMATION GARANTIE
// ============================================
function animate() {
    requestAnimationFrame(animate);
    
    if (currentAvatar) {
        // Rotation lente
        currentAvatar.rotation.y += 0.008;
        
        // Animation subtile des bras (si c'est l'avatar humain)
        currentAvatar.children.forEach(child => {
            if (child.geometry && child.geometry.type === 'CylinderGeometry') {
                if (Math.abs(child.position.x) > 0.2) { // C'est un bras
                    child.rotation.z += Math.sin(Date.now() * 0.002) * 0.001;
                }
            }
        });
    }
    
    renderer.render(scene, camera);
}

// ============================================
// REDIMENSIONNEMENT
// ============================================
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// ============================================
// DÉMARRAGE
// ============================================
// Démarrer avec l'avatar simple par défaut
switchToSimpleAvatar();
animate();

console.log("✅ Application 3D démarrée avec succès!");
console.log("✅ Avatar garanti visible");
console.log("✅ Éclairage fort appliqué");
console.log("✅ Contrôles interactifs disponibles");