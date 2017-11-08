varying vec3 interpolatedNormal;
varying vec3 viewPos;

uniform vec3 lightDirectionUniform;
uniform vec3 ambientColorUniform;
uniform vec3 lightColorUniform;

void main() {

	vec3 N = normalize(interpolatedNormal);
	vec3 L = normalize(vec3(viewMatrix * vec4(lightDirectionUniform, 0.0)));
	vec3 V = normalize(-viewPos);
	vec3 R = reflect(-L, N);
  vec3 color;

	  float lightIntensity = max(dot(N,L),0.0);;
	  color = vec3(1.0, 1.0, 1.0);

	  if (lightIntensity < 0.8){
	    // hatch from left top corner to right bottom
	    if (mod(gl_FragCoord.x + gl_FragCoord.y, 10.0) == 0.0) {
	      color = vec3(0.0, 0.0, 1.0);
	    }
	  }
	  if (lightIntensity < 0.55){
	    // hatch from right top corner to left boottom
	    if (mod(gl_FragCoord.x - gl_FragCoord.y, 10.0) == 0.0){
	    color = vec3(0.0, 0.0, 1.0);
	    }
	  }
	  if (lightIntensity < 0.4){
	    // hatch from left top to right bottom
	    if (mod(gl_FragCoord.x + gl_FragCoord.y - 5.0, 10.0) == 0.0){
	    color = vec3(0.0, 0.0, 1.0);
	    }
	  }
	  if (lightIntensity < 0.15){
	    // hatch from right top corner to left bottom
	    if (mod(gl_FragCoord.x - gl_FragCoord.y - 5.0, 10.0) == 0.0){
	    color = vec3(0.0, 0.0, 1.0);
	    }
	  }

		float k = abs(dot(V,N));
		if (k < 0.1)
			color = vec3(0.1,0.1,0.3);

	  gl_FragColor = vec4(color,1.0);
}
