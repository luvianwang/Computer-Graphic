// Shared variable passed to the fragment shader
varying vec3 color;

// Constant set via your javascript code
uniform vec3 lightPosition;

uniform float nodding;

void main() {
	// No lightbulb, but we still want to see the armadillo!
	vec3 l = vec3(0.0, 0.0, -1.0);
	color = vec3(1.0) * dot(l, normal);

	// Identifying the head
	mat4 rotationMatrix;

	if (position.z < -0.33 && abs(position.x) < 0.46){
		//color = vec3(1.0, 0.0, 1.0);

    rotationMatrix = mat4(1.0, 0.0, 0.0, 0.0,
                  			  0.0, cos(nodding), sin(nodding), 0.0,
	                			  0.0, -sin(nodding), cos(nodding), 0.0,
                  			  0.0, 2.5, -0.3, 1.0);


    mat4 inv = mat4(1.0, 0.0, 0.0, 0.0,
						      0.0, 1.0, 0.0, 0.0,
						      0.0, 0.0, 1.0, 0.0,
						      0.0, -2.5, 0.3, 1.0);

    gl_Position = projectionMatrix * modelViewMatrix * rotationMatrix * inv * vec4(position, 1.0);

  }
	else
		// Multiply each vertex by the model-view matrix and the projection matrix to get final vertex position
		gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
