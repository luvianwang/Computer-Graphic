// UNIFORMS
uniform samplerCube skybox;
varying vec3 view;

void main() {
	gl_FragColor = textureCube(skybox, view);
}
