uniform float uTime;
uniform float uFreq[64];

varying vec3 vNormal;
varying float vIntensity;

void main() {
  vNormal = normal;

  float freq = uFreq[int(mod(float(gl_VertexID), 64.0))];
  float distortion = sin(uTime * 2.0 + position.y * 5.0) * 0.2 + freq * 0.5;

  vec3 newPosition = position + normal * distortion;
  vIntensity = distortion;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
