varying vec3 vNormal;
varying float vIntensity;

void main() {
  vec3 color = mix(vec3(0.0, 0.8, 0.4), vec3(0.1, 1.0, 0.8), vIntensity);
  gl_FragColor = vec4(color, 1.0);
}
