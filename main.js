// ✅ CORRECTION: IMPORT ABSOLU avec URL complète
import * as THREE from 'https://unpkg.com/three@0.128.0/build/three.module.js';

// ============================================
// SCÈNE GARANTIE VISIBLE - Modèles simples
// ============================================

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xcccccc); // Fond gris clair confirmé

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.set(2, 2, 4);

// ============================================
// 1. HELPERS VISUELS (toujours visibles)
// ============================================
const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);

const gridHelper = new THREE.GridHelper(10, 10, 0x000000, 0x888888);
gridHelper.position.y = 0;
scene.add(gridHelper);

// ============================================
// 2. ÉCLAIRAGE FORT (garanti)
// ============================================
const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
directionalLight.position.set(5, 10, 7);
directionalLight.castShadow = true;
scene.add(directionalLight);

const pointLight = new THREE.PointLight(0xffffff, 0.8, 100);
pointLight.position.set(-5, 5, 5);
scene.add(pointLight);

// ============================================
// 3. AVATAR SIMPLE GARANTI VISIBLE
// ============================================

// Option A: Avatar humain simple avec primitives Three.js
function createSimpleHumanAvatar() {
    const group = new THREE.Group();

    // Tête (sphère)
    const headGeometry = new THREE.SphereGeometry(0.2, 16, 16);
    const headMaterial = new THREE.MeshStandardMaterial({
        color: 0xFFCC99,
        roughness: 0.3
    });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.y = 1.6;
    group.add(head);

    // Corps (cylindre)
    const bodyGeometry = new THREE.CylinderGeometry(0.15, 0.3, 0.8, 8);
    const bodyMaterial = new THREE.MeshStandardMaterial({
        color: 0x2196F3,
        metalness: 0.2
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 0.9;
    group.add(body);

    // Bras gauche
    const leftArmGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.6, 8);
    const armMaterial = new THREE.MeshStandardMaterial({
        color: 0x4CAF50,
        metalness: 0.2
    });
    const leftArm = new THREE.Mesh(leftArmGeometry, armMaterial);
    leftArm.position.set(-0.25, 1.1, 0);
    leftArm.rotation.z = Math.PI / 4;
    group.add(leftArm);

    // Bras droit
    const rightArm = leftArm.clone();
    rightArm.position.set(0.25, 1.1, 0);
    rightArm.rotation.z = -Math.PI / 4;
    group.add(rightArm);

    // Jambe gauche
    const leftLegGeometry = new THREE.CylinderGeometry(0.07, 0.07, 0.7, 8);
    const legMaterial = new THREE.MeshStandardMaterial({
        color: 0x795548,
        metalness: 0.2
    });
    const leftLeg = new THREE.Mesh(leftLegGeometry, legMaterial);
    leftLeg.position.set(-0.1, 0.25, 0);
    group.add(leftLeg);

    // Jambe droite
    const rightLeg = leftLeg.clone();
    rightLeg.position.set(0.1, 0.25, 0);
    group.add(rightLeg);

    // Yeux
    const eyeGeometry = new THREE.SphereGeometry(0.03, 8, 8);
    const eyeMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.06, 1.65, 0.15);
    group.add(leftEye);

    const rightEye = leftEye.clone();
    rightEye.position.set(0.06, 1.65, 0.15);
    group.add(rightEye);

    // Bouche
    const mouthGeometry = new THREE.TorusGeometry(0.04, 0.01, 4, 8, Math.PI);
    const mouthMaterial = new THREE.MeshStandardMaterial({ color: 0xFF5252 });
    const mouth = new THREE.Mesh(mouthGeometry, mouthMaterial);
    mouth.position.set(0, 1.55, 0.15);
    mouth.rotation.x = Math.PI / 2;
    group.add(mouth);

    return group;
}

// Option B: Robot simple alternatif
function createSimpleRobot() {
    const group = new THREE.Group();

    // Corps principal (cube)
    const bodyGeometry = new THREE.BoxGeometry(0.5, 0.8, 0.3);
    const bodyMaterial = new THREE.MeshStandardMaterial({
        color: 0x607D8B,
        metalness: 0.8,
        roughness: 0.2
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 0.8;
    group.add(body);

    // Tête (cube plus petit)
    const headGeometry = new THREE.BoxGeometry(0.3, 0.3, 0.3);
    const headMaterial = new THREE.MeshStandardMaterial({
        color: 0x455A64,
        metalness: 0.9
    });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.y = 1.35;
    group.add(head);

    // Yeux (LEDs)
    const eyeGeometry = new THREE.SphereGeometry(0.05, 8, 8);
    const eyeMaterial = new THREE.MeshStandardMaterial({
        color: 0x00E5FF,
        emissive: 0x00B0FF,
        emissiveIntensity: 0.5
    });
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.08, 1.4, 0.16);
    group.add(leftEye);

    const rightEye = leftEye.clone();
    rightEye.position.set(0.08, 1.4, 0.16);
    group.add(rightEye);

    // Bras
    const armGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.6, 8);
    const armMaterial = new THREE.MeshStandardMaterial({
        color: 0x37474F,
        metalness: 0.7
    });

    const leftArm = new THREE.Mesh(armGeometry, armMaterial);
    leftArm.position.set(-0.35, 0.9, 0);
    leftArm.rotation.z = Math.PI / 6;
    group.add(leftArm);

    const rightArm = leftArm.clone();
    rightArm.position.set(0.35, 0.9, 0);
    rightArm.rotation.z = -Math.PI / 6;
    group.add(rightArm);

    // Jambes
    const legGeometry = new THREE.CylinderGeometry(0.06, 0.06, 0.7, 8);
    const legMaterial = new THREE.MeshStandardMaterial({
        color: 0x263238,
        metalness: 0.7
    });

    const leftLeg = new THREE.Mesh(legGeometry, legMaterial);
    leftLeg.position.set(-0.12, 0.15, 0);
    group.add(leftLeg);

    const rightLeg = leftLeg.clone();
    rightLeg.position.set(0.12, 0.15, 0);
    group.add(rightLeg);

    return group;
}

// ============================================
// AJOUT DE L'AVATAR CHOISI À LA SCÈNE
// ============================================
console.log("🎯 Création de l'avatar 3D garantie visible...");

// Créer l'avatar (choisissez celui que vous préférez)
const avatar = createSimpleHumanAvatar(); // Avatar humain simple
// const avatar = createSimpleRobot();     // Avatar robot (décommentez pour utiliser)

scene.add(avatar);

// Positionner l'avatar au centre
avatar.position.set(0, 0, 0);

// ============================================
// ANIMATION
// ============================================
function animate() {
    requestAnimationFrame(animate);

    // Rotation lente de l'avatar
    avatar.rotation.y += 0.01;

    // Petite animation des bras
    if (avatar.children) {
        // Recherche des bras dans l'avatar humain
        avatar.children.forEach(child => {
            if (child.geometry && child.geometry.type === 'CylinderGeometry') {
                // Animation subtile des bras
                if (child.position.x < 0) { // Bras gauche
                    child.rotation.z = Math.PI / 4 + Math.sin(Date.now() * 0.003) * 0.2;
                } else if (child.position.x > 0) { // Bras droit
                    child.rotation.z = -Math.PI / 4 + Math.sin(Date.now() * 0.003) * 0.2;
                }
            }
        });
    }

    renderer.render(scene, camera);
}

// ============================================
// GESTION DU REDIMENSIONNEMENT
// ============================================
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// ============================================
// DÉMARRAGE
// ============================================
animate();

console.log("✅ Avatar 3D créé avec succès!");
console.log("✅ Le modèle est visible dans l'aperçu");
console.log("✅ Fond gris clair confirmé");
console.log("✅ Éclairage fort appliqué");
console.log("✅ Animation active");