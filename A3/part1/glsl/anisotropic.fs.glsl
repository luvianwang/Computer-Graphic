uniform vec3 lightDirectionUniform;
uniform float kAmbientUniform;
uniform float kDiffuseUniform;
uniform float kSpecularUniform;
uniform vec3 lightColorUniform;
uniform float shininessUniform;
uniform vec3 ambientColorUniform;
uniform float alphaXUniform;
uniform float alphaYUniform;

varying vec3 interpolatedNormal;
varying vec3 viewPos;
varying vec3 cameraPos;

void main() {

	vec3 N = normalize(interpolatedNormal);
	vec3 L = normalize(vec3(viewMatrix * vec4(lightDirectionUniform, 0.0)));
	vec3 V = normalize(cameraPos-viewPos);
	vec3 H = normalize(V + L);
	vec3 T = normalize(cross(vec3(0.0,1.0,0.0),N));
	vec3 B = cross(T,N);

	//AMBIENT
	vec3 light_AMB = ambientColorUniform * kAmbientUniform;;

	//DIFFUSE
	vec3 light_DFF = kDiffuseUniform * lightColorUniform * max(dot(N, L), 0.0);

	//SPECULAR
	float x = pow(dot(H,T)/alphaXUniform,2.0);
	float y = pow(dot(H,B)/alphaYUniform,2.0);
	float specular = kSpecularUniform*sqrt(max(dot(L,N)/dot(V,N),0.0))*exp(-2.0*(x+y)/(1.0+dot(H,N)));
	vec3 light_SPC = kSpecularUniform * lightColorUniform * specular;

	//TOTAL
	vec3 TOTAL = light_AMB + light_DFF + light_SPC;
	gl_FragColor = vec4(TOTAL, 0.0);

}
