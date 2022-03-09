let scene, camera, renderer, clock, gui, gridHelper, controls;

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
  const geometry = new THREE.PlaneGeometry(100, 100);
  const material = new THREE.MeshBasicMaterial({ color: 0x666666 });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.rotation.x = -Math.PI / 2;
  scene.add(mesh);

  // Add some buildings
  for (let i = 0; i < 100; i++) {
    const buildingGeo = new THREE.BoxGeometry(5, 5, 5);
    const buildingMat = new THREE.MeshStandardMaterial({ color: 0x999999 });
    const building = new THREE.Mesh(buildingGeo, buildingMat);
    const gridX = (Math.floor(Math.random() * 10) - 5) * 10;
    const gridZ = (Math.floor(Math.random() * 10) - 5) * 10;
    building.position.x = gridX;
    building.position.z = gridZ;
    building.position.y = 2.5;
    building.scale.y = 1.0 + Math.random() * 5;
    building.position.y = building.scale.y / 2;

    scene.add(building);
  }

  // const manager = new THREE.LoadingManager();
  const loader = new THREE.GLTFLoader();
  loader.load("assets/car-scaled.glb", (gltf) => {
    const car = gltf.scene;
    car.rotation.y = -Math.PI / 2;
    scene.add(car);
  });

  // The car uses materials that require lights, so we need to set at least an ambient light.
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
  directionalLight.position.set(0, 0, 1);
  scene.add(directionalLight);

  // THREE.DefaultLoadingManager.onLoad = function ( ) {

  // manager.on

  // Create a GridHelper to show where the camera is.
  gridHelper = new THREE.GridHelper(100, 10);
  scene.add(gridHelper);

  camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
  camera.position.z = 4;
  camera.position.y = 1.3;
  scene.add(camera);

  const canvas = document.querySelector(".webgl");
  renderer = new THREE.WebGLRenderer({
    canvas: canvas,
  });
  window.addEventListener("resize", resize);

  clock = new THREE.Clock(true);

  gui = new lil.GUI();
  gui.add(settings, "gridHelper");

  controls = new THREE.OrbitControls(camera, renderer.domElement);
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
