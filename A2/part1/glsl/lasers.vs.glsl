
uniform int whichLaser;
uniform vec3 lightPosition;

void main() {

vec3 eyePosition;

mat4 transformMatrix;
if(whichLaser==1){
  transformMatrix = mat4(0.0, -1, 0.0, 0.0,
                         1, 0.0, 0.0, 0.0,
                         0.0, 0.0, 1, 0.0,
                         0.13, 2.45, -0.75, 1.0);
  eyePosition = vec3(0.13, 2.45, -0.75);
}
else if(whichLaser==2){
  transformMatrix = mat4(0.0, -1, 0.0, 0.0,
                         1, 0.0, 0.0, 0.0,
                         0.0, 0.0, 1, 0.0,
                         -0.13, 2.45, -0.75, 1.0);
  eyePosition = vec3(-0.13, 2.45, -0.75);
}

float dis = length(lightPosition-eyePosition);

vec3 P = vec3(0,1,0)*mat3(0.0, 0.1, 0.0,
                          0.1, 0.0, 0.0,
                          0.0, 0.0, -0.1);
vec3 L = vec3(normalize(lightPosition-eyePosition));
float cosTheta = dot(normalize(P),L);
float sinTheta = sqrt(1.0-cosTheta*cosTheta);

mat4 rotationMatrix;
if(lightPosition[2]>-0.75){
  rotationMatrix = mat4(1,0,0,0,
                        0,cosTheta,sinTheta,0,
                        0,-sinTheta,cosTheta,0,
                        0,0,0,1);
}
else{
  rotationMatrix = mat4(1,0,0,0,
                        0,cosTheta,-sinTheta,0,
                        0,sinTheta,cosTheta,0,
                        0,0,0,1); }

mat4 scaleMatrix = mat4(1,0,0,0,
                        0,dis/2.0,0,0,
                        0,0,1,0,
                        0,0,0,1);
gl_Position = projectionMatrix * modelViewMatrix * transformMatrix * rotationMatrix * scaleMatrix * vec4(position, 1.0) ;
}
