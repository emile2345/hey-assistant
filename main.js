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
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Lights
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(2, 5, 2);
scene.add(light);

scene.add(new THREE.AmbientLight(0xffffff, 0.4));

// Load avatar
const loader = new THREE.GLTFLoader();
let avatar = null;

loader.load(
  "avatar.glb",
  (gltf) => {
    avatar = gltf.scene;
    avatar.scale.set(1, 1, 1);
    avatar.position.set(0, 0, 0);
    scene.add(avatar);
  },
  undefined,
  (error) => {
    console.error("GLB load error:", error);
  }
);

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  if (avatar) {
    avatar.rotation.y += 0.002;
  }
  renderer.render(scene, camera);
}
animate();

// Resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});


