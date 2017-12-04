// Shared variable passed to the fragment shader
varying vec3 color;

// Constant set via your javascript code
uniform vec3 lightPosition;
uniform float time;

varying vec3 Normal_V;
varying vec3 Position_V;
varying vec2 Texcoord_V;

varying vec3 P;
varying vec3 interpolatedNormal;

void main() {

	interpolatedNormal = normal;
	P = position;
	Normal_V = normalMatrix * normal;
	Position_V = vec3(modelViewMatrix * vec4(position, 1.0));
	Texcoord_V = uv;
	
	// No lightbulb, but we still want to see the armadillo!
	vec3 l = vec3(0.0, 0.0, -1.0);
	color = vec3(1.0) * dot(l, normal);

	// Identifying the head
	mat4 rotationMatrix2 = mat4(abs(cos(time)), 0.0, sin(time), 0.0,
														  0.0, 1.0, 0.0, 0.0,
															-sin(time), 0.0, abs(cos(time)), 0.0,
														  0.0, 0.0, 0.0, 1.0);
	mat4 rotationMatrix;
	// if (position.z < -0.33 && abs(position.x) < 0.46){
	// 	//color = vec3(1.0, 0.0, 1.0);
  //
	// 	rotationMatrix = mat4(1.0, 0.0, 0.0, 0.0,
	// 												0.0, abs(cos(time)), sin(time), 0.0,
	// 												0.0, -sin(time), abs(cos(time)), 0.0,
	// 												0.0, 2.5, -0.3, 1.0);
  //
  //
	// 	mat4 inv = mat4(1.0, 0.0, 0.0, 0.0,
	// 								0.0, 1.0, 0.0, 0.0,
	// 								0.0, 0.0, 1.0, 0.0,
	// 								0.0, -2.5, 0.3, 1.0);
  //
	// 	gl_Position = projectionMatrix * modelViewMatrix * rotationMatrix2 * rotationMatrix * inv * vec4(position, 1.0);
  //
	// }
	// else
	if (position.z < 1.0 && position.x < -0.62 && position.y > 1.9 && position.y < 3.0){

	  //color = vec3(1.0, 0.0, 1.0);
    rotationMatrix = mat4(1.0, 0.0, 0.0, 0.0,
                  			  0.0, abs(cos(-time*2.0)), sin(-time*2.0), 0.0,
	                			  0.0, -sin(-time*2.0), abs(cos(-time*2.0)), 0.0,
                  			  0.0, 2.2, 0.0, 1.0);


    mat4 inv = mat4(1.0, 0.0, 0.0, 0.0,
						      0.0, 1.0, 0.0, 0.0,
						      0.0, 0.0, 1.0, 0.0,
						      0.0, -2.2, 0.0, 1.0);

    gl_Position = projectionMatrix * modelViewMatrix * rotationMatrix2 * rotationMatrix*inv * vec4(position, 1.0);
  }
	else if (position.z < 1.0 && position.x >0.62 && position.y > 1.9 && position.y < 3.0){

	  //color = vec3(1.0, 0.0, 1.0);
    rotationMatrix = mat4(1.0, 0.0, 0.0, 0.0,
                  			  0.0, abs(cos(time*2.0)), sin(time*2.0), 0.0,
	                			  0.0, -sin(time*2.0), abs(cos(time*2.0)), 0.0,
                  			  0.0, 2.2, 0.0, 1.0);


    mat4 inv = mat4(1.0, 0.0, 0.0, 0.0,
						      0.0, 1.0, 0.0, 0.0,
						      0.0, 0.0, 1.0, 0.0,
						      0.0, -2.2, 0.0, 1.0);

    gl_Position = projectionMatrix * modelViewMatrix * rotationMatrix2 * rotationMatrix*inv * vec4(position, 1.0);
  }
	else if (position.z < 1.0 && position.x >0.18 && position.y < 1.3){

	  //color = vec3(1.0, 0.0, 0.0);
    rotationMatrix = mat4(1.0, 0.0, 0.0, 0.0,
													0.0, abs(cos(time*2.0)), sin(time*2.0), 0.0,
	                			  0.0, -sin(time*2.0), abs(cos(time*2.0)), 0.0,
                  			  0.5, 1.3, 0.0, 1.0);

    mat4 inv = mat4(1.0, 0.0, 0.0, 0.0,
						      0.0, 1.0, 0.0, 0.0,
						      0.0, 0.0, 1.0, 0.0,
						      -0.5, -1.3, 0.0, 1.0);

    gl_Position = projectionMatrix * modelViewMatrix * rotationMatrix2 * rotationMatrix*inv * vec4(position, 1.0);
  }
	else if (position.z < 1.0 && position.x <-0.18 && position.y < 1.3){

	  //color = vec3(1.0, 0.0, 0.0);
    rotationMatrix = mat4(1.0, 0.0, 0.0, 0.0,
													0.0, abs(cos(time*2.0)), -sin(time*2.0), 0.0,
	                			  0.0, sin(time*2.0), abs(cos(time*2.0)), 0.0,
                  			  -0.5, 1.3, 0.0, 1.0);

    mat4 inv = mat4(1.0, 0.0, 0.0, 0.0,
						      0.0, 1.0, 0.0, 0.0,
						      0.0, 0.0, 1.0, 0.0,
						      0.5, -1.3, 0.0, 1.0);

    gl_Position = projectionMatrix * modelViewMatrix * rotationMatrix2 * rotationMatrix *inv * vec4(position, 1.0);
  }
	else
		gl_Position = projectionMatrix * modelViewMatrix * rotationMatrix2 *vec4(position, 1.0);
}
