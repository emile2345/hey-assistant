// ============================================
// Hey Assistant - Three.js Scene (CUBE TEST)
// Compatible WebView Android & navigateurs modernes
// ============================================

(function () {
  'use strict';

  // === INITIALISATION ===
  var canvas = document.getElementById('scene');
  var scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);

  // === CAMÉRA ===
  var camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );
  camera.position.z = 3;

  // === RENDERER ===
  var renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: false,
    powerPreference: 'low-power'
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // === ÉCLAIRAGE ===
  scene.add(new THREE.AmbientLight(0xffffff, 0.6));

  var light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(1, 1, 2);
  scene.add(light);

  // === CUBE DE TEST (GARANTI) ===
  var geometry = new THREE.BoxGeometry(1, 1, 1);
  var material = new THREE.MeshStandardMaterial({ color: 0x40E0D0 });
  var cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  console.log('✅ SCÈNE INITIALISÉE — CUBE AJOUTÉ');

  // === ANIMATION LOOP ===
  function animate() {
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
  }
  animate();

  // === RESIZE ===
  window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

})();




