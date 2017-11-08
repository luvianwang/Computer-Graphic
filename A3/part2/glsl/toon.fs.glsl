varying vec3 interpolatedNormal;
varying vec3 viewPos;
varying vec3 cameraPos;

uniform vec3 lightDirectionUniform;
uniform vec3 ambientColorUniform;
uniform vec3 lightColorUniform;

void main() {
	vec3 N = normalize(interpolatedNormal);
	vec3 L = normalize(vec3(viewMatrix * vec4(lightDirectionUniform, 0.0)));
	vec3 V = normalize(cameraPos-viewPos);

	//TOTAL INTENSITY
	//TODO PART 1D: calculate light intensity
	float lightIntensity = max(dot(N,L),0.0);

   	vec4 resultingColor = vec4(0.0,0.0,0.0,0.0);

   	//TODO PART 1D: change resultingColor based on lightIntensity (toon shading)

		if (lightIntensity > 0.6)
   		resultingColor = vec4(1, 1, 1, 1.0);
   	else if (lightIntensity > 0.45)
   		resultingColor = vec4(0.8, 0.8, 0.9, 1.0);
   	else if (lightIntensity > 0.35)
   		resultingColor = vec4(0.5, 0.5, 0.6, 1.0);
  	else if (lightIntensity > 0.15)
   		resultingColor = vec4(0.3, 0.3, 0.4, 1.0);
  	else
   		resultingColor = vec4(0.2, 0.2, 0.3, 1.0);

   	//TODO PART 1D: change resultingColor to silhouette objects
		float k = abs(dot(V,N));
    float thickness = 0.2;
    if (k < thickness)
    	resultingColor = vec4(0.1,0.1,0.3,1.0);

	gl_FragColor = resultingColor;
}
