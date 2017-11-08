varying vec3 interpolatedNormal;
varying vec3 viewPos;
varying vec3 cameraPos;

void main() {

	// TODO: PART 1B

	 interpolatedNormal = normalMatrix * normal;
	 viewPos = vec3(modelViewMatrix * vec4(position, 1.0));
	 cameraPos = vec3(viewMatrix * vec4(cameraPosition, 1.0));

  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
