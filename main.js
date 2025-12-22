const canvas = document.getElementById("scene");

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.set(0, 1.4, 2.5);

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// Lights
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(2, 5, 2);
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

// Cube de test
let avatar = null;
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: 0x00ffcc });
avatar = new THREE.Mesh(geometry, material);
scene.add(avatar);

// Exemple futur pour charger un GLB (avatar.glb)
// const loader = new THREE.GLTFLoader();
// loader.load(
//   "avatar.glb",
//   (gltf) => {
//     avatar = gltf.scene;
//     avatar.scale.set(1, 1, 1);
//     avatar.position.set(0, 0, 0);
//     scene.add(avatar);
//   },
//   undefined,
//   (error) => { console.error("GLB load error:", error); }
// );

// Animate loop
function animate() {
  requestAnimationFrame(animate);
  if (avatar) avatar.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();

// Handle window resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});




