var windowHalfX = window.innerWidth / 2;

let targetRotation = 0;
let targetRotationOnMouseDown = 0;
let mouseX = 0;
let mouseXOnMouseDown = 0;
var renderer,camera,scene,bird1,bird,geometry1,stats;

window.addEventListener('DOMContentLoaded', function (){
  stats = new Stats();
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 500 )
  renderer = new THREE.CanvasRenderer({
    antialias: true,
  });

	renderer.setClearColor( 0xffffff );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize(  window.innerWidth, window.innerHeight );

  document.body.appendChild(renderer.domElement);
  geometry1 = new THREE.Geometry();

  geometry1.vertices.push(
    new THREE.Vector3(   5,   0,   0 ),
    new THREE.Vector3( - 5, - 2,   0 ),
    new THREE.Vector3( - 5,   0,   0 ),
    new THREE.Vector3( - 5, - 2, - 1 ),

    new THREE.Vector3(   0,   2, - 6 ),
    new THREE.Vector3(   0,   2,   6 ),
    new THREE.Vector3(   2,   0,   0 ),
    new THREE.Vector3( - 3,   0,   0 )
  );

  geometry1.faces.push(
    new THREE.Face3( 0, 1, 2 ) ,
    new THREE.Face3( 2, 1, 0 ) ,
    new THREE.Face3( 4, 7, 6 ),
    new THREE.Face3( 6, 7, 4 ),
    new THREE.Face3( 5, 6, 7 ),
    new THREE.Face3( 7, 6, 5 )
  );

  bird = new THREE.Mesh( geometry1, new THREE.MeshBasicMaterial( { color: Math.random() * 0xffffff } ) );
  bird.phase = Math.floor( Math.random() * 62.83 );

  scene.add(bird);

  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = 50;
  camera.up.x = 0;
  camera.up.y = 0;
  camera.up.z = 0;
  camera.lookAt({
    x: 0,
    y: 0,
    z: 0,
  });

  animate();
  document.addEventListener('mousedown', onDocumentMouseDown, false);
  document.addEventListener('touchstart', onDocumentTouchStart, false);
  document.addEventListener('touchmove', onDocumentTouchMove, false);
});

const onDocumentMouseDown = (event) => {
  event.preventDefault();
  document.addEventListener('mousemove', onDocumentMouseMove, false);
  document.addEventListener('mouseup', onDocumentMouseUp, false);
  document.addEventListener('mouseout', onDocumentMouseOut, false);
  mouseXOnMouseDown = event.clientX - windowHalfX;
  targetRotationOnMouseDown = targetRotation;
};

const onDocumentMouseMove = (event) => {
  mouseX = event.clientX - windowHalfX;
  targetRotation = targetRotationOnMouseDown + (mouseX - mouseXOnMouseDown) * 0.02;
};

const onDocumentMouseUp = (event) => {
  document.removeEventListener('mousemove', onDocumentMouseMove, false);
  document.removeEventListener('mouseup', onDocumentMouseUp, false);
  document.removeEventListener('mouseout', onDocumentMouseOut, false);
};

const onDocumentMouseOut = (event) => {
  document.removeEventListener('mousemove', onDocumentMouseMove, false);
  document.removeEventListener('mouseup', onDocumentMouseUp, false);
  document.removeEventListener('mouseout', onDocumentMouseOut, false);
};

const onDocumentTouchStart = (event) => {
  if (event.touches.length === 1) {
    event.preventDefault();
    mouseXOnMouseDown = event.touches[0].pageX - windowHalfX;
    targetRotationOnMouseDown = targetRotation;
  }
};

const onDocumentTouchMove = (event) => {
  if (event.touches.length === 1) {
    event.preventDefault();
    mouseX = event.touches[0].pageX - windowHalfX;
    targetRotation = targetRotationOnMouseDown + (mouseX - mouseXOnMouseDown) * 0.05;
  }
};
var i = 0;
const render = ()=>{

	// bird.phase = ( bird.phase + ( Math.max( 0, bird.phase ) + 0.1 )  ) % 62.83;
  //
	// bird.geometry.vertices[ 5 ].y = bird.geometry.vertices[ 4 ].y = Math.sin( bird.phase ) * 5;

  bird.rotation.y += (targetRotation - bird.rotation.y) * 0.05;

  renderer.render(scene, camera);

}

const animate = () => {
  requestAnimationFrame(animate);
  render();
};
