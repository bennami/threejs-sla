let scene, camera, renderer, clock, gui, gridHelper, mouse, meshGroup;

// Define the window size.
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const settings = {
  gridHelper: false,
  distance: 50,
  animationSpeed: 0.05,
  seed: 42,
  torusRadius: 2,
  torusTube: 0.2,
  positionScale: 100,
  positionScale: 100,
  scaleScale: 3,
  amount: 100,
};

function initScene() {
  // Create the scene.
  scene = new THREE.Scene();

  // Create the group that will hold the mesh.
  meshGroup = new THREE.Group();
  scene.add(meshGroup);
  rebuildScene();

  // Create a GridHelper to show where the camera is.
  gridHelper = new THREE.GridHelper(100, 10);
  scene.add(gridHelper);

  camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
  camera.position.z = 50;
  camera.position.y = 10;
  scene.add(camera);

  const canvas = document.querySelector(".webgl");
  renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
  });
  // renderer.setClearColor(0x000000, 0.2);
  window.addEventListener("resize", resize);
  canvas.addEventListener("mousemove", mouseMove);

  clock = new THREE.Clock(true);

  gui = new lil.GUI();
  gui.add(settings, "gridHelper");
  gui.add(settings, "distance").min(0).max(100).step(0.1);
  gui.add(settings, "animationSpeed").min(0.00001).max(1).step(0.0001);
  gui.add(settings, "seed").min(0).max(1000).step(1).onChange(rebuildScene);
  gui.add(settings, "torusRadius").min(0).max(5).step(0.01).onChange(rebuildScene);
  gui.add(settings, "torusTube").min(0).max(5).step(0.01).onChange(rebuildScene);
  gui.add(settings, "positionScale").min(0).max(200).step(0.1).onChange(rebuildScene);
  gui.add(settings, "scaleScale").min(0).max(10).step(0.001).onChange(rebuildScene);
  gui.add(settings, "amount").min(0).max(5000).step(1).onChange(rebuildScene);

  mouse = { x: 0, y: 0 };
}

function rebuildScene() {
  // Clear the meshgroup
  meshGroup.children = [];
  Math.seedrandom(settings.seed);
  // Create a simple object and add it to the scene.
  const geometry = new THREE.TorusGeometry(settings.torusRadius, settings.torusTube, 16, 100);
  for (let i = 0; i < settings.amount; i++) {
    const material = new THREE.MeshNormalMaterial();
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = (Math.random() - 0.5) * settings.positionScale;
    mesh.position.y = (Math.random() - 0.5) * settings.positionScale;
    mesh.position.z = (Math.random() - 0.5) * settings.positionScale;
    mesh.rotation.x = Math.random() * 2 * Math.PI;
    mesh.rotation.y = Math.random() * 2 * Math.PI;
    const scale = Math.random() * settings.scaleScale;
    mesh.scale.set(scale, scale, scale);
    meshGroup.add(mesh);
  }
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
  const targetPositionX = mouse.x * settings.distance;
  const targetPositionY = mouse.y * settings.distance;
  camera.position.x = camera.position.x + (targetPositionX - camera.position.x) * settings.animationSpeed;
  camera.position.y = camera.position.y + (targetPositionY - camera.position.y) * settings.animationSpeed;
  camera.lookAt(scene.position);
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

function mouseMove(event) {
  mouse = {
    x: (event.clientX / sizes.width) * 2 - 1,
    y: -(event.clientY / sizes.height) * 2 + 1,
  };
}

initScene();
resize();
animate();
