let scene, camera, renderer, clock, gui, gridHelper, mouse;

// Define the window size.
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const settings = {
  gridHelper: false,
  distance: 50,
  animationSpeed: 0.05,
};

function initScene() {
  // Create the scene.
  scene = new THREE.Scene();

  // Create a simple object and add it to the scene.
  for (let i = 0; i < 100; i++) {
    const geometry = new THREE.TorusGeometry(2, 0.4, 16, 100);
    const material = new THREE.MeshNormalMaterial();
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = (Math.random() - 0.5) * 100;
    mesh.position.y = (Math.random() - 0.5) * 100;
    mesh.position.z = (Math.random() - 0.5) * 100;
    mesh.rotation.x = Math.random() * 2 * Math.PI;
    mesh.rotation.y = Math.random() * 2 * Math.PI;
    const scale = Math.random() * 3;
    mesh.scale.set(scale, scale, scale);
    scene.add(mesh);
  }

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

  mouse = { x: 0, y: 0 };
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
