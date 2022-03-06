// first things first, let's check that our cdn link is working
// by logging 'THREE' we should see the object in the console of our browser
console.log(THREE);

//create your scene
const scene = new THREE.Scene();

// create objects
// to make an object we need a Mesh that contains two things:
// A geometry (the kind of shape we want) 
// A material (how it looks: color, texture, etc.)
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);

//once you create your Mesh, you need to add it to the scene
scene.add(mesh);

//Camera
//first argument: field of view
//sec argument: the aspect ratio, 
///we set these in an object so we can easily reuse them
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);

//Because everything you create is at (0,0,0) 
//coordinates when u render the scene you won't see nothing since the camera will be inside the cube
// to fix this we can just move it a bit
// we can move any object in this manner
camera.position.z = 3;

//always add the object!
scene.add(camera);

//responsive canvas
//to make our canvas responsive we need to select the DOM element first
const canvas = document.querySelector('.webgl');

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    //update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    //update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
});

//renderer

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});

renderer.setSize(sizes.width, sizes.height);

//animate to resize objects proportionately
function animate() { 
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);