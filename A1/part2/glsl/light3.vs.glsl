uniform vec3 light3Position;
varying vec3 interpolatedNormal;

void main() {
	
    interpolatedNormal = position;

	gl_Position = projectionMatrix * modelViewMatrix * vec4(position+light3Position, 1.0);

}
