import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  Group,
} from 'three';
import { WIDTH, HEIGHT } from './tools';
import './index.less';

let scene,
  camera,
  renderer,
  group;
let targetRotation = 0;
let targetRotationOnMouseDown = 0;
let mouseX = 0;
let mouseXOnMouseDown = 0;
const windowHalfX = WIDTH / 2;

const init = () => {
  scene = new Scene(); // 场景
  camera = new PerspectiveCamera(75, WIDTH / HEIGHT, 0.1, 1000); // 透视相机
  renderer = new WebGLRenderer({
    antialias: true,
  }); // 渲染器
  group = new Group();
  renderer.setSize(WIDTH, HEIGHT); // 设置渲染器的大小

  document.addEventListener('mousedown', onDocumentMouseDown, false);
  document.addEventListener('touchstart', onDocumentTouchStart, false);
  document.addEventListener('touchmove', onDocumentTouchMove, false);

  document.body.appendChild(renderer.domElement); // 将渲染器加入dom中
};

const addCube = () => {
  const geometry = new BoxGeometry(3, 3, 3);
  const material = new MeshBasicMaterial({ color: 0x00ffff });
  const header = new Mesh(geometry, material);
  header.position.y = 1;

  const geometry1 = new BoxGeometry(2, 3, 2);
  const material1 = new MeshBasicMaterial({ color: 0xffffff });
  const body = new Mesh(geometry1, material1);
  body.position.y = -1.5;

  const geometry2 = new BoxGeometry(1, 0.5, 1);
  const material2 = new MeshBasicMaterial({ color: 0xff00ff });
  const foot = new Mesh(geometry2, material2);
  foot.position.y = -3.3;

  const geometry3 = new BoxGeometry(0.5, 1, 0.5);
  const material3 = new MeshBasicMaterial({ color: 0x0000ff });
  const left = new Mesh(geometry3, material3);
  left.position.x = -1.3;
  left.position.y = -1.5;

  const geometry4 = new BoxGeometry(0.5, 1, 0.5);
  const material4 = new MeshBasicMaterial({ color: 0xff0000 });
  const right = new Mesh(geometry4, material4);
  right.position.x = 1.3;
  right.position.y = -1.5;

  group.add(header).add(body).add(foot).add(left).add(right);

  scene.add(group);

  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = 10;
  camera.up.x = 0;
  camera.up.y = 0;
  camera.up.z = 0;
  camera.lookAt({
    x: 0,
    y: 0,
    z: 0,
  });
};

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

const render = () => {
  group.rotation.y = group.rotation.y += (targetRotation - group.rotation.y) * 0.05;
  renderer.render(scene, camera);
};

const animate = () => {
  requestAnimationFrame(animate);
  render();
};

window.addEventListener('DOMContentLoaded', () => {
  init();
  addCube();
  animate();
});
