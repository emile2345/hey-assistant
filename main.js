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

// Light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(2, 5, 2);
scene.add(light);

const ambient = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambient);

// Load avatar
const loader = new THREE.GLTFLoader();
loader.load(
    "models/avatar.glb",
    (gltf) => {
        const avatar = gltf.scene;
        avatar.scale.set(1, 1, 1);
        avatar.position.set(0, 0, 0);
        scene.add(avatar);

        // Simple rotation to prove it's alive
        function animate() {
            requestAnimationFrame(animate);
            avatar.rotation.y += 0.002;
            renderer.render(scene, camera);
        }
        animate();
    },
    undefined,
    (error) => {
        console.error("Avatar load error", error);
    }
);

// Resize
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

