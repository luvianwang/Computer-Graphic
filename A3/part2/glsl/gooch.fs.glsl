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

	vec3 warm = vec3(1.0, 0.3, 0.0);
  vec3 cool = vec3(0.0, 0.8, 0.8);

  vec3 diffuse = vec3(max(dot(L, N),0.0));

  //mix performs a linear interpolation between x and y using a to weight between them.
	//The return value is computed as x*(1−a)+y*a.
  vec3 color = mix(cool, warm, diffuse);
	gl_FragColor = vec4(color,0.0);
}
