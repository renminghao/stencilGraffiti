import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  // Vector3,
} from 'three';
import { WIDTH, HEIGHT } from './tools';
import './index.less';

const init = () => {
  const scene = new Scene(); // 场景
  const camera = new PerspectiveCamera(75, WIDTH / HEIGHT, 0.1, 1000); // 透视相机
  const renderer = new WebGLRenderer({
    antialias: true,
  }); // 渲染器

  renderer.setSize(WIDTH, HEIGHT); // 设置渲染器的大小

  document.body.appendChild(renderer.domElement); // 将渲染器加入dom中

  return {
    scene,
    camera,
    renderer,
  };
};

const addCube = ({ scene, camera, renderer, color = '0x00ff00' }) => {
  const geometry = new BoxGeometry(5, 5, 5);
  const material = new MeshBasicMaterial({ color });
  const cube = new Mesh(geometry, material);

  scene.add(cube);
  // camera.position.z = 10;

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

  return {
    geometry,
    material,
    cube,
    renderer,
    scene,
    camera,
  };
};

const animate = ({ geometry, material, cube, renderer, scene, camera }) => {
  requestAnimationFrame(animate.bind(this, { geometry, material, cube, renderer, scene, camera }));
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
};


window.addEventListener('DOMContentLoaded', () => {
  const initData = init();
  const cubeData = addCube({
    ...initData,
  });
  animate(cubeData);
});
