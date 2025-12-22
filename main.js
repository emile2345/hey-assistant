// ============================================
// Hey Assistant - Three.js Scene
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
    75,                                      // FOV
    window.innerWidth / window.innerHeight,  // Aspect ratio
    0.1,                                     // Near
    100                                      // Far
  );
  camera.position.z = 3;

  // === RENDERER (Performance maximale) ===
  var renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: false,        // Désactivé pour performance
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

  // === CUBE DE TEST (turquoise) ===
  var geometry = new THREE.BoxGeometry(1, 1, 1);
  var material = new THREE.MeshStandardMaterial({ color: 0x40E0D0 });
  var cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  // === ANIMATION LOOP ===
  function animate() {
    requestAnimationFrame(animate);
    
    // Rotation du cube
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    
    renderer.render(scene, camera);
  }
  animate();

  // === GESTION DU RESIZE ===
  window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // ============================================
  // POUR CHARGER AVATAR.GLB (décommenter plus tard)
  // ============================================
  /*
  var loader = new THREE.GLTFLoader();
  
  loader.load(
    'avatar.glb',
    function(gltf) {
      // Succès : ajouter le modèle à la scène
      var avatar = gltf.scene;
      scene.add(avatar);
      
      // Optionnel : ajuster position/échelle
      // avatar.position.set(0, 0, 0);
      // avatar.scale.set(1, 1, 1);
      
      // Supprimer le cube de test
      scene.remove(cube);
      geometry.dispose();
      material.dispose();
      
      console.log('Avatar chargé avec succès !');
    },
    function(xhr) {
      // Progression du chargement
      console.log((xhr.loaded / xhr.total * 100) + '% chargé');
    },
    function(error) {
      // Erreur
      console.error('Erreur chargement avatar:', error);
    }
  );
  */

})();
