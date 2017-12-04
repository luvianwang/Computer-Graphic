// Shared variable interpolated across the triangle
varying vec3 color;
//VARYING VAR
varying vec3 Normal_V;
varying vec3 Position_V;
varying vec2 Texcoord_V;

//UNIFORM VAR
uniform vec3 lightColorUniform;
uniform vec3 ambientColorUniform;
uniform vec3 lightDirectionUniform;

uniform float kAmbientUniform;
uniform float kDiffuseUniform;
uniform float kSpecularUniform;

uniform float shininessUniform;

uniform vec3 light2Position;

uniform vec3 light3Position;
varying vec3 P;
varying vec3 interpolatedNormal;

void main() {
  vec3 N = normalize(Normal_V);
	vec3 L = normalize(vec3(viewMatrix * vec4(lightDirectionUniform, 0.0)));
	vec3 V = normalize(-Position_V);
	vec3 H = normalize((V + L) * 0.5);

	//AMBIENT
	vec3 light_AMB = ambientColorUniform * kAmbientUniform;

	//DIFFUSE
	vec3 diffuse = kDiffuseUniform * lightColorUniform;
	vec3 light_DFF = diffuse * max(0.0, dot(N, L));

	//SPECULAR
	vec3 specular = kSpecularUniform * vec3(1.0,1.0,1.0);
	vec3 light_SPC = specular * pow(max(0.0, dot(H, N)), shininessUniform);

		vec3 L2 = vec3(normalize(light2Position-P));
		float dis2 = length(light2Position-P);
		float cosTheta2 = dot(normalize(interpolatedNormal),L2);

		vec3 L3 = vec3(normalize(light3Position-P));
		float dis3 = length(light3Position-P);
		float cosTheta3 = dot(normalize(interpolatedNormal),L3);
		vec3 color = vec3(vec3(1,1,0) * cosTheta2 + vec3(1,0,1) * cosTheta3);

	//TOTAL
	vec3 TOTAL = light_AMB + color  + light_SPC;

	gl_FragColor = vec4(TOTAL, 1.0);
}
