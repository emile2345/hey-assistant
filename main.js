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

  // === CHARGEMENT DE L'AVATAR ===
  var avatar = null;
  var loader = new THREE.GLTFLoader();
  
  loader.load(
    'avatar.glb',
    function(gltf) {
      avatar = gltf.scene;
      
      // === AJUSTER POSITION ===
      // avatar.position.set(x, y, z)
      // x: gauche(-) / droite(+)
      // y: bas(-) / haut(+)
      // z: loin(-) / proche(+)
      avatar.position.set(0, -1, 0);  // Centré, légèrement en bas
      
      // === AJUSTER ÉCHELLE ===
      // avatar.scale.set(x, y, z) - valeurs identiques = uniforme
      avatar.scale.set(1, 1, 1);  // Taille normale
      // avatar.scale.set(0.5, 0.5, 0.5);  // 50% de la taille
      // avatar.scale.set(2, 2, 2);  // 200% de la taille
      
      // === AJUSTER ROTATION (optionnel) ===
      // avatar.rotation.y = Math.PI;  // Tourner de 180°
      
      scene.add(avatar);
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
    
    // Rotation douce de l'avatar (optionnel)
    if (avatar) {
      avatar.rotation.y += 0.005;
    }
    
    renderer.render(scene, camera);
  }
  animate();

  // === GESTION DU RESIZE ===
  window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

})();



