// Shared variable passed to the fragment shader
varying vec3 color;
uniform int whichEye;
uniform vec3 lightPosition;


#define MAX_EYE_DEPTH 0.15

void main() {
  // simple way to color the pupil where there is a concavity in the sphere
  // position is in local space, assuming radius 1
  float d = min(1.0 - length(position), MAX_EYE_DEPTH);
  color = mix(vec3(1.0), vec3(0.0), d * 1.0 / MAX_EYE_DEPTH);

  mat4 transformMatrix;
  vec3 eyePosition;
  if(whichEye==1){
    transformMatrix = mat4(0.0, 0.1, 0.0, 0.0,
                           0.1, 0.0, 0.0, 0.0,
                           0.0, 0.0, -0.1, 0.0,
                           0.26, 4.9, -1.4, 1.0);
    eyePosition = vec3(0.26, 4.9, -1.4);
  }
  else if(whichEye==2){
    transformMatrix = mat4(0.0, 0.1, 0.0, 0.0,
                           0.1, 0.0, 0.0, 0.0,
                           0.0, 0.0, -0.1, 0.0,
                           -0.26,4.9,-1.4,1.0);
    eyePosition = vec3(-0.26, 4.9, -1.4);
  }

  vec3 P = vec3(0,1,0)*mat3(0.0, 0.1, 0.0,
                            0.1, 0.0, 0.0,
                            0.0, 0.0, -0.1);
  vec3 L = vec3(normalize(lightPosition-eyePosition));
  float cosTheta = dot(normalize(P),L);
  float sinTheta = sqrt(1.0-cosTheta*cosTheta);

  mat4 rotationMatrix = mat4(1,0,0,0,
                             0,cosTheta,sinTheta,0,
                             0,-sinTheta,cosTheta,0,
                             0,0,0,1);


  // Multiply each vertex by the model-view matrix and the projection matrix to get final vertex position
  gl_Position = projectionMatrix * modelViewMatrix * transformMatrix * rotationMatrix* vec4(position, 1.0) ;
}
