let scene, camera, renderer, clock, gui, gridHelper;

// Define the window size.
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const settings = {
  lookAt: true,
  cameraRotation: new THREE.Vector3(),
  gridHelper: true,
};

function initScene() {
  // Create the scene.
  scene = new THREE.Scene();

  // Create a simple object and add it to the scene.
  const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
  const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

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
  });
  window.addEventListener("resize", resize);

  clock = new THREE.Clock(true);

  gui = new lil.GUI();
  gui.add(camera.position, "x").min(-100).max(100).step(0.1);
  gui.add(camera.position, "y").min(-100).max(100).step(0.1);
  gui.add(camera.position, "z").min(-100).max(100).step(0.1);
  gui.add(settings, "lookAt");
  gui.add(settings.cameraRotation, "x").min(-3).max(3).step(0.001);
  gui.add(settings.cameraRotation, "y").min(-3).max(3).step(0.001);
  gui.add(settings.cameraRotation, "z").min(-3).max(3).step(0.001);
  gui.add(settings, "gridHelper");
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
  // camera.position.x = Math.sin(clock.getElapsedTime()) * 50;
  if (settings.lookAt) {
    camera.lookAt(scene.position);
  } else {
    camera.rotation.setFromVector3(settings.cameraRotation.clone());
  }
  gridHelper.visible = settings.gridHelper;
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

initScene();
resize();
animate();
