uniform vec3 box2Color;
varying vec3 interpolatedNormal;

void main() {
	gl_FragColor = vec4(interpolatedNormal,1);
}