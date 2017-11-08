// Create shared variable. The value is given as the interpolation between normals computed in the vertex shader
varying vec3 interpolatedNormal;

uniform vec3 lightPosition;
varying vec3 P;


/* HINT: YOU WILL NEED MORE SHARED/UNIFORM VARIABLES TO COLOR ACCORDING TO COS(ANGLE) */

void main() {

  // Set final rendered color according to the surface normal
  //gl_FragColor = vec4(normalize(interpolatedNormal), 0.0); // REPLACE ME

  vec3 color;

  vec3 L = vec3(normalize(lightPosition-P));
  float dis = length(lightPosition-P);
  float cosTheta = dot(normalize(interpolatedNormal),L);

	   if(dis < 1.5)
  		  color = vec3(vec3(0, 1, 0) * cosTheta );
  	 else
  		  color = vec3(vec3(1, 1, 0) * cosTheta );


	gl_FragColor = vec4(color,0);
  	

}

