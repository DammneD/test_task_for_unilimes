import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);

const renderer = new THREE.WebGL1Renderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.basicShadowMap;

document.body.appendChild(renderer.domElement);
let size;

function getSize() {
  if (document.getElementById('input').value) {
    size = document.getElementById('input').value;
  } else {
    size = 1;
  }
}

function renderCube() {
  // eslint-disable-next-line prefer-spread
  scene.remove.apply(scene, scene.children);

  const pointLight = new THREE.PointLight(0xffffff, 0.2, 100);
  pointLight.position.set(3, 3, 3);
  scene.add(pointLight);

  const geometry = new THREE.BoxGeometry(size, size, size);
  const material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  camera.position.z = 5;

  const animate = () => {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
  };

  animate();
}

function renderSphere() {
  // eslint-disable-next-line prefer-spread
  scene.remove.apply(scene, scene.children);

  const geometry = new THREE.SphereGeometry(size, 64, 32);
  const material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
  const sphere = new THREE.Mesh(geometry, material);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const light = new THREE.SpotLight(0xffffff, 0.8, 18);
  light.position.set(-3, 2, 0);
  light.castShadow = true;
  light.shadow.camera.near = 0.1;
  light.shadow.camera.far = 5;

  scene.add(light);

  sphere.castShadow = true;
  sphere.receiveShadow = false;

  scene.add(sphere);

  camera.position.z = 5;

  const animate = () => {
    requestAnimationFrame(animate);
    sphere.rotation.x += 0.01;
    sphere.rotation.y += 0.01;
    renderer.render(scene, camera);
  };

  animate();
}

function renderPyramid() {
  // eslint-disable-next-line prefer-spread
  scene.remove.apply(scene, scene.children);

  const geometry = new THREE.CylinderGeometry(0, size, size, 3, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
  const pyramid = new THREE.Mesh(geometry, material);

  scene.add(pyramid);

  camera.position.z = 5;

  const animate = () => {
    requestAnimationFrame(animate);
    pyramid.rotation.x += 0;
    pyramid.rotation.y += 0.01;
    renderer.render(scene, camera);
  };

  animate();
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);

const createButton = document.querySelector('#create');

createButton.addEventListener('click', (event) => {
  event.preventDefault();
  const figure = document.getElementById('select').value;

  getSize();
  switch (figure) {
    case 'cube':
      renderCube();
      break;
    case 'sphere':
      renderSphere();
      break;
    case 'pyramid':
      renderPyramid();
      break;
    default:
      break;
  }
});
