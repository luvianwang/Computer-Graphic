
varying vec3 view;

void main() {
	view = position - cameraPosition;
	gl_Position = projectionMatrix * viewMatrix * vec4(position, 1.0);
}
