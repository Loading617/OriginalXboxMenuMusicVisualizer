import * as THREE from "three";
import vertexShader from "./shaders/blob.vert.glsl?raw";
import fragmentShader from "./shaders/blob.frag.glsl?raw";

export function initVisualizer(analyser: AnalyserNode, audioCtx: AudioContext) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 3;

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const freqData = new Uint8Array(analyser.frequencyBinCount);

  const geometry = new THREE.IcosahedronGeometry(1, 64);
  const uniforms = {
    uTime: { value: 0 },
    uFreq: { value: new Array(64).fill(0).map(() => 0.0) },
  };

  const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms,
    wireframe: false,
  });

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  function animate() {
    requestAnimationFrame(animate);

    analyser.getByteFrequencyData(freqData);
    for (let i = 0; i < 64; i++) {
      uniforms.uFreq.value[i] = freqData[i] / 255;
    }

    uniforms.uTime.value = audioCtx.currentTime;

    mesh.rotation.y += 0.002;
    mesh.rotation.x += 0.001;
    renderer.render(scene, camera);
  }

  animate();
}
