let scene, camera, renderer, clock, gui, gridHelper, solarSystem;

// Define the window size.
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const settings = {
  gridHelper: false,
};

// Linear interpolation between two values.
// E.g. if we lerp from 100 - 200 at 0.5, we get 150.
function lerp(start, end, t) {
  return (1 - t) * start + t * end;
}

function initScene() {
  // Create the scene.
  scene = new THREE.Scene();

  // Create a simple object and add it to the scene.
  const loader = new THREE.GLTFLoader();
  loader.load("assets/solar-system.glb", (gltf) => {
    solarSystem = gltf.scene;
    solarSystem.scale.set(30, 30, 30);
    solarSystem.rotation.y = Math.PI;
    solarSystem.position.z = 100;
    scene.add(solarSystem);
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
  gui.hide();

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
  // Figure out where we are in the document.
  const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
  // Calculate this as a fraction of the total height (so a value between 0.0-1.0).
  const scrollFraction = window.scrollY / totalHeight;
  // Convert this to the Z position of the camera.
  const targetPositionZ = lerp(16, 300, scrollFraction);
  // Animate the camera to the new position.
  camera.position.z = camera.position.z + (targetPositionZ - camera.position.z) * 0.1;

  if (solarSystem) {
    const mars = solarSystem.children[1];
    mars.rotation.y += 0.01;
    // debugger;
    // group.children[6].rotation.y += 0.01;
    // group.children[7].rotation.y += 0.01;
  }

  gridHelper.visible = settings.gridHelper;
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

initScene();
resize();
animate();
