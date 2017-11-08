// Create shared variable. The value is given as the interpolation between normals computed in the vertex shader
varying vec3 interpolatedNormal;

uniform vec3 lightPosition;

uniform vec3 light2Position;

uniform vec3 light3Position;

uniform int mode;
varying vec3 P;


/* HINT: YOU WILL NEED MORE SHARED/UNIFORM VARIABLES TO COLOR ACCORDING TO COS(ANGLE) */

void main() {

  // Set final rendered color according to the surface normal
  //gl_FragColor = vec4(normalize(interpolatedNormal), 0.0); // REPLACE ME

  vec3 color;
  if (mode == 2){
	color = interpolatedNormal;
  }
  if (mode == 1){  
  	vec3 L = vec3(normalize(lightPosition-P));
  	float dis = length(lightPosition-P);
  	float cosTheta = dot(normalize(interpolatedNormal),L);

	   if(dis < 1.5)
  		  color = vec3(vec3(0, 1, 0) * cosTheta );
  	 else
  		  color = vec3(vec3(1, 1, 0) * cosTheta );
  }
  if(mode == 3){
    vec3 L2 = vec3(normalize(light2Position-P));
    float dis2 = length(light2Position-P);
    float cosTheta2 = dot(normalize(interpolatedNormal),L2);


    vec3 L3 = vec3(normalize(light3Position-P));
    float dis3 = length(light3Position-P);
    float cosTheta3 = dot(normalize(interpolatedNormal),L3);

    color = vec3(vec3(1,1,0) * cosTheta2 + vec3(1,0,1) * cosTheta3);
  }

		gl_FragColor = vec4(color,0);
  	

}

