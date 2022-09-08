//clock跟踪时间处理动画
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
//物体缩放scale
cube.scale.set(3, 2, 1);
//物体旋转
// cube.rotation.x = 0.45;
//Math.PI = 180度
cube.rotation.set(Math.PI / 4, 0, 5, "ZXY");
//设置相机高度
camera.position.z = 5;
scene.add(cube);
//
document.body.appendChild(renderer.domElement);
// renderer.render(scene, camera);
//添加坐标轴服务器
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);
//设置时钟
const clock = new THREE.Clock();
//创建控制器
const controls = new OrbitControls(camera, renderer.domElement);
camera.position.set(0, 20, 10);
controls.update();
function animate(time) {
  //获取时钟时长
  // let clockTime = clock.getElapsedTime();
  //获取两次时钟间隔时间
  let deltaTime = clock.getDelta();
  // console.log("时钟运行时时长", clockTime);
  console.log("两次获取间隔时间", deltaTime);
  //默认传入time,单位是毫秒
  //下一帧再执行animate
  // cube.position.x -= 0.01;
  // 优化方案
  let t = (time / 1000) % 5;
  cube.position.x = t * 1;
  // if (cube.position.x < -5) {
  //   cube.position.x = 5;
  // }
  requestAnimationFrame(animate);
  //动态移动
  // required if controls.enableDamping or controls.autoRotate are set to true
  controls.update();
  //
  renderer.render(scene, camera);
}
animate();

createApp(App).mount("#app");
