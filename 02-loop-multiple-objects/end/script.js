// first things first, let's check that our cdn link is working
// by logging 'THREE' we should see the object in the console of our browser
console.log(THREE);

//create your scene
const scene = new THREE.Scene();

//create loop of objects
for (let i = 0; i < 200; i++) {
  const geometry = new THREE.SphereGeometry(0.5, 24, 24);
  const material = new THREE.MeshBasicMaterial({ color: "#f9fc9f" });
  const star = new THREE.Mesh(geometry, material);
  const x = THREE.MathUtils.randFloat(-50, 50);
  const y = THREE.MathUtils.randFloat(-50, 50);
  const z = THREE.MathUtils.randFloat(-50, 50);
  star.position.set(x, y, z);
  //for demonstration here are the values set separately
  //star.position.set(x);
  //star.position.z = 9; the larger the number the closer
  //star.position.y = -1;
  scene.add(star);
}

//give the scene a different background
scene.background = new THREE.Color("#31173d");

//Camera
//first argument: field of view
//sec argument: the aspect ratio,
///we set these in an object so we can easily reuse them
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);

//Because everything you create is at (0,0,0)
//coordinates when u render the scene you won't see nothing since the camera will be inside the cube
// to fix this we can just move it a bit
// we can move any object in this manner
camera.position.z = 20;

gridHelper = new THREE.GridHelper(100, 10);
scene.add(gridHelper);

//always add the object!
scene.add(camera);

//responsive canvas
//to make our canvas responsive we need to select the DOM element first
const canvas = document.querySelector(".webgl");

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  //update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  //update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.render(scene, camera); //important to re-render after each change
});

//renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});

renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

// Add orbit controls
const controls = new THREE.OrbitControls(camera, renderer.domElement);

function animate() {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();
