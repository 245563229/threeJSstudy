//应用图形用户改变变量
import { createApp } from "vue";
import "./style.css";
import * as THREE from "three";
import App from "./App.vue";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from "dat.gui";
import gsap from "gsap";
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
cube.position.x = 5;
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
//设置控制器阻尼，让其更真实
controls.enableDamping = true;
//摄像头位置属性
camera.position.set(0, 20, 10);
controls.update();
function animate(time) {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
//gasp设置动画
window.addEventListener("resize", () => {
  console.log("画面变化");
  // 更新摄像头
  camera.aspect = window.innerWidth / window.innerHeight;
  // 更新摄像机的投影矩阵
  camera.updateProjectionMatrix();
  //更新渲染器
  renderer.setSize(window.innerWidth, window.innerHeight);
  //设置渲染器像素比
  renderer.setPixelRatio(window.devicePixelRatio);
});
window.addEventListener("dblclick", () => {
  //双击控制屏幕全屏
  const fullScreenElement = document.fullscreenElement;
  if (fullScreenElement) {
    document.exitFullscreen();
  } else {
    renderer.domElement.requestFullscreen();
  }
});
//初始化gui
const gui = new dat.GUI();
gui
  .add(cube.position, "x")
  .min(0)
  .max(5)
  .step(0.01)
  .name("移动x轴")
  .onChange((val) => {
    console.log("被修改为", val);
  })
  .onFinishChange((val) => {
    console.log("完全停下来触发", val);
  });
//修改物体颜色
const colorSet = {
  color: "#FFF",
  firstFun: () => {
    //让物体运动
    gsap.to(cube.position, { x: 0, duration: 2, yoyo: true, repeat: -1 });
  },
};
gui.addColor(colorSet, "color").onChange((val) => {
  console.log("更改颜色", val);
  cube.material.color.set(val);
});
//设置选项框
gui.add(cube, "visible").name("是否显示");
//设置按钮触发事件
gui.add(colorSet, "firstFun").name("物体运动");
//设置立方体
var folder = gui.addFolder("设置立方体");
// wireframe线框
folder.add(cube.material, "wireframe");
createApp(App).mount("#app");
