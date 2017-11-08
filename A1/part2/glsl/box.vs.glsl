uniform vec3 boxPosition;
varying vec3 interpolatedNormal;

void main() {
	
    interpolatedNormal = position;

	gl_Position = projectionMatrix * modelViewMatrix * vec4(position+boxPosition, 1.0);

}
