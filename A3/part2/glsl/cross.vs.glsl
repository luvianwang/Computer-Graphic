varying vec3 interpolatedNormal;
varying vec3 viewPos;

void main() {

	// TODO: PART 1D
	interpolatedNormal = normalMatrix * normal;
	viewPos = vec3(modelViewMatrix * vec4(position, 1.0));

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
