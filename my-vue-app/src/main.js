//3D物体移动
import { createApp } from "vue";
import "./style.css";
import * as THREE from "three";
import App from "./App.vue";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// 创建相机
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  1000
);
const renderer = new THREE.WebGLRenderer();
//创建场景
const scene = new THREE.Scene();
renderer.setSize(window.innerWidth, window.innerHeight);
//创建几何体
const geometry = new THREE.BoxGeometry(1, 1, 1);
//设置材质
const material = new THREE.MeshBasicMaterial({ color: 0x4aa5f0 });
const cube = new THREE.Mesh(geometry, material);
//物体移动
// cube.position.set(10, 5, 5);
cube.position.x = 10;
camera.position.z = 5;
scene.add(cube);
//
document.body.appendChild(renderer.domElement);
// renderer.render(scene, camera);

//创建控制器
const controls = new OrbitControls(camera, renderer.domElement);
camera.position.set(0, 20, 10);
controls.update();
function animate() {
  //下一帧再执行animate
  cube.position.x -= 0.01;
  if (cube.position.x < -5) {
    cube.position.x = 5;
  }
  requestAnimationFrame(animate);
  //动态移动
  // required if controls.enableDamping or controls.autoRotate are set to true
  controls.update();
  //
  renderer.render(scene, camera);
}
animate();
//添加坐标轴服务器
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

createApp(App).mount("#app");
