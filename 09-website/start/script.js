let scene, camera, renderer, clock, gui, gridHelper;

// Define the window size.
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const settings = {
  gridHelper: true,
};

function initScene() {
  // Create the scene.
  scene = new THREE.Scene();

  // Create a simple object and add it to the scene.
  const loader = new THREE.GLTFLoader();
  loader.load("assets/solar-system.glb", (gltf) => {
    const mesh = gltf.scene;
    mesh.scale.set(30, 30, 30);
    mesh.rotation.y = Math.PI;
    mesh.position.z = 100;

    scene.add(mesh);
  });

  const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
  scene.add(ambientLight);

  // Create a GridHelper to show where the camera is.
  gridHelper = new THREE.GridHelper(100, 10);
  scene.add(gridHelper);

  camera = new THREE.PerspectiveCamera(50, sizes.width / sizes.height);
  camera.position.x = -10;
  camera.position.z = 16;
  camera.position.y = -5;
  scene.add(camera);

  const canvas = document.querySelector(".webgl");
  renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
  });
  window.addEventListener("resize", resize);

  clock = new THREE.Clock(true);

  gui = new lil.GUI();
  gui.add(settings, "gridHelper");
  gui.add(camera.position, "z").min(0).max(300).step(0.1);
  gui.add(camera.position, "x").min(-20).max(20).step(0.01);
  gui.add(camera.position, "y").min(-20).max(20).step(0.01);

  // const controls = new THREE.OrbitControls(camera, renderer.domElement);
}

function resize() {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  //update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  //update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
}

function animate() {
  gridHelper.visible = settings.gridHelper;
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

initScene();
resize();
animate();
