varying vec3 interpolatedNormal;
varying vec3 viewPos;

uniform vec3 lightColorUniform;
uniform vec3 ambientColorUniform;
uniform vec3 lightDirectionUniform;
uniform float kAmbientUniform;
uniform float kDiffuseUniform;
uniform float kSpecularUniform;
uniform float shininessUniform;
varying vec3 cameraPos;

void main() {

vec3 N = normalize(interpolatedNormal);
vec3 L = normalize(vec3(viewMatrix * vec4(lightDirectionUniform, 0.0)));
vec3 V = normalize(cameraPos-viewPos);
vec3 H = normalize(V + L);

	//AMBIENT
	vec3 light_AMB = ambientColorUniform * kAmbientUniform;;

	//DIFFUSE
	vec3 light_DFF = kDiffuseUniform * lightColorUniform * max(dot(N, L), 0.0);

	//SPECULAR
	vec3 light_SPC = kSpecularUniform * lightColorUniform * pow(max(0.0, dot(H, N)), shininessUniform);

	//TOTAL
	vec3 TOTAL = light_AMB + light_DFF + light_SPC;
	gl_FragColor = vec4(TOTAL, 0.0);

}
