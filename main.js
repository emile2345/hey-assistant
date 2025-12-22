// ============================================
// Hey Assistant - Three.js Scene avec Avatar
// Compatible WebView Android & navigateurs modernes
// ============================================

(function() {
  'use strict';

  // === INITIALISATION ===
  var canvas = document.getElementById('scene');
  var scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);

  // === CAMÉRA ===
  var camera = new THREE.PerspectiveCamera(
    75, window.innerWidth / window.innerHeight, 0.1, 100
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
  var ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);

  // === CUBE DE TEST ===
  var geometry = new THREE.BoxGeometry(1, 1, 1);
  var material = new THREE.MeshStandardMaterial({ color: 0x40E0D0 });
  var cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  // === CHARGEMENT AVATAR GLB ===
  var avatar = null;
  var loader = new THREE.GLTFLoader();

  loader.load(
    'avatar.glb',
    function(gltf) {
      avatar = gltf.scene;

      // --- Positionner au centre de l'écran ---
      avatar.position.set(0, 1.5, 0);  // ajusté pour qu'il soit centré verticalement
      avatar.scale.set(1, 1, 1);

      scene.add(avatar);

      // Supprimer le cube de test
      scene.remove(cube);
      geometry.dispose();
      material.dispose();

      console.log('Avatar chargé avec succès !');
    },
    function(xhr) {
      console.log((xhr.loaded / xhr.total * 100) + '% chargé');
    },
    function(error) {
      console.error('Erreur chargement avatar:', error);
    }
  );

  // === ANIMATION LOOP ===
  function animate() {
    requestAnimationFrame(animate);

    if (avatar) {
      avatar.rotation.y += 0.01; // rotation continue
    } else {
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
    }

    renderer.render(scene, camera);
  }
  animate();

  // === RESIZE ===
  window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

})();

