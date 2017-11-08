uniform vec3 light2Position;
varying vec3 interpolatedNormal;

void main() {
	
    interpolatedNormal = position;

	gl_Position = projectionMatrix * modelViewMatrix * vec4(position+light2Position, 1.0);

}
