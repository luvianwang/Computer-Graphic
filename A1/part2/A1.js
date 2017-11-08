/*
 * UBC CPSC 314, Vsep2017
 * Assignment 1 Template
 */

// SETUP RENDERER & SCENE
var canvas = document.getElementById('canvas');
var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0xFFFFFF); // white background colour
canvas.appendChild(renderer.domElement);

// SETUP CAMERA
var camera = new THREE.PerspectiveCamera(30,1,0.1,1000); // view angle, aspect ratio, near, far
camera.position.set(45,20,40);
camera.lookAt(scene.position);
scene.add(camera);

// SETUP ORBIT CONTROLS OF THE CAMERA
var controls = new THREE.OrbitControls(camera);
controls.damping = 0.2;
controls.autoRotate = false;

// ADAPT TO WINDOW RESIZE
function resize() {
  renderer.setSize(window.innerWidth,window.innerHeight);
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
}

// EVENT LISTENER RESIZE
window.addEventListener('resize',resize);
resize();

//SCROLLBAR FUNCTION DISABLE
window.onscroll = function () {
     window.scrollTo(0,0);
   }

// WORLD COORDINATE FRAME: other objects are defined with respect to it
var worldFrame = new THREE.AxisHelper(5) ;
scene.add(worldFrame);

// FLOOR WITH PATTERN
var floorTexture = new THREE.ImageUtils.loadTexture('images/floor.jpg');
floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
floorTexture.repeat.set(1, 1);

var floorMaterial = new THREE.MeshBasicMaterial({ map: floorTexture, side: THREE.DoubleSide });
var floorGeometry = new THREE.PlaneBufferGeometry(30, 30);
var floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.position.y = -3.1;
floor.rotation.x = Math.PI / 2;
scene.add(floor);
floor.parent = worldFrame;

/////////////////////////////////
//   YOUR WORK STARTS BELOW    //
/////////////////////////////////

// UNIFORMS
var lightPosition = {type: 'v3', value: new THREE.Vector3(0,0,1)};

var light2Position = {type: 'v3', value: new THREE.Vector3(0,0,5)};
var light3Position = {type: 'v3', value: new THREE.Vector3(5,-5,-5)};

var boxPosition = {type: 'v3', value: new THREE.Vector3(5,5,5)};

var boxColor = {type: 'v3', value: new THREE.Vector3(0,0,0)};

var mode = {type : 'i', value: 1};

var timer = 0.0;

// MATERIALS
var armadilloMaterial = new THREE.ShaderMaterial({
  uniforms: {
    lightPosition: lightPosition,
    boxPosition: boxPosition,
    mode : mode,
    light2Position: light2Position,
    light3Position: light3Position,
  },
});

var lightbulbMaterial = new THREE.ShaderMaterial({
   uniforms: {
    lightPosition: lightPosition,
  },
});

var boxMaterial = new THREE.ShaderMaterial({
   uniforms: {
    boxPosition: boxPosition,
    boxColor: boxColor,
  },
});

var light2Material = new THREE.ShaderMaterial({
   uniforms: {
    light2Position: light2Position,
  },
});

var light3Material = new THREE.ShaderMaterial({
   uniforms: {
    light3Position: light3Position,
  },
});
// LOAD SHADERS
var shaderFiles = [
  'glsl/armadillo.vs.glsl',
  'glsl/armadillo.fs.glsl',
  'glsl/lightbulb.vs.glsl',
  'glsl/lightbulb.fs.glsl',
  'glsl/box.vs.glsl',
  'glsl/box.fs.glsl',
  'glsl/light2.vs.glsl',
  'glsl/light2.fs.glsl',
  'glsl/light3.vs.glsl',
  'glsl/light3.fs.glsl',
];

new THREE.SourceLoader().load(shaderFiles, function(shaders) {
  armadilloMaterial.vertexShader = shaders['glsl/armadillo.vs.glsl'];
  armadilloMaterial.fragmentShader = shaders['glsl/armadillo.fs.glsl'];
  
  lightbulbMaterial.vertexShader = shaders['glsl/lightbulb.vs.glsl'];
  lightbulbMaterial.fragmentShader = shaders['glsl/lightbulb.fs.glsl'];

  boxMaterial.vertexShader = shaders['glsl/box.vs.glsl'];
  boxMaterial.fragmentShader = shaders['glsl/box.fs.glsl'];
  light2Material.vertexShader = shaders['glsl/light2.vs.glsl'];
  light2Material.fragmentShader = shaders['glsl/light2.fs.glsl'];
  light3Material.vertexShader = shaders['glsl/light3.vs.glsl'];
  light3Material.fragmentShader = shaders['glsl/light3.fs.glsl'];
})

// LOAD ARMADILLO
function loadOBJ(file, material, scale, xOff, yOff, zOff, xRot, yRot, zRot) {
  var onProgress = function(query) {
    if ( query.lengthComputable ) {
      var percentComplete = query.loaded / query.total * 100;
      console.log( Math.round(percentComplete, 2) + '% downloaded' );
    }
  };

  var onError = function() {
    console.log('Failed to load ' + file);
  };

  var loader = new THREE.OBJLoader();
  loader.load(file, function(object) {
    object.traverse(function(child) {
      if (child instanceof THREE.Mesh) {
        child.material = material;
      }
    });

    object.position.set(xOff,yOff,zOff);
    object.rotation.x= xRot;
    object.rotation.y = yRot;
    object.rotation.z = zRot;
    object.scale.set(scale,scale,scale);
    object.parent = worldFrame;
    scene.add(object);

  }, onProgress, onError);
}

loadOBJ('obj/armadillo.obj', armadilloMaterial, 3, 0,0,0, 0,0,0);

// CREATE light
var lightbulbGeometry = new THREE.SphereGeometry(1, 32, 32);
var lightbulb = new THREE.Mesh(lightbulbGeometry, lightbulbMaterial);
lightbulb.parent = worldFrame;
scene.add(lightbulb);


var boxGeometry = new THREE.CubeGeometry(2, 2, 2);
var box = new THREE.Mesh(boxGeometry, boxMaterial);
box.parent = worldFrame;

var light2Geometry = new THREE.SphereGeometry(1, 32, 32);
var light2 = new THREE.Mesh(light2Geometry, light2Material);
light2.parent = worldFrame;

var light3Geometry = new THREE.SphereGeometry(1, 32, 32);
var light3 = new THREE.Mesh(light3Geometry, light3Material);
light3.parent = worldFrame;

// LISTEN TO KEYBOARD
var keyboard = new THREEx.KeyboardState();
function checkKeyboard() {
  if (keyboard.pressed("W"))
    lightPosition.value.z -= 0.1;
  else if (keyboard.pressed("S"))
    lightPosition.value.z += 0.1;

  if (keyboard.pressed("A"))
    lightPosition.value.x -= 0.1;
  else if (keyboard.pressed("D"))
    lightPosition.value.x += 0.1;

  if (keyboard.pressed("2")){
      scene.add(box);
      scene.remove(lightbulb);
      scene.remove(light2);
      scene.remove(light3);
      mode.value = 2;
  }
  else if(keyboard.pressed("1")){
      scene.remove(box);
      scene.add(lightbulb);
      scene.remove(light2);
      scene.remove(light3);
      mode.value = 1;
  }
  else if(keyboard.pressed("3")){
      scene.remove(box);
      scene.remove(lightbulb);
      scene.add(light2);
      scene.add(light3);
      mode.value = 3;
  }

  boxMaterial.needsUpdate = true;
  lightbulbMaterial.needsUpdate = true;
  armadilloMaterial.needsUpdate = true;
}


function rotatebox(){
  box.rotateX(0.03);
  box.rotateY(0.03);
  box.rotateZ(0.03);
  boxMaterial.needsUpdate = true;
}

function incrementTimer(){
    timer += 0.06;
}

function rotateLight(){

  light2Position.value.x = 5 * Math.sin(timer)*(-1);
  light2Position.value.z = 5 * Math.cos(timer);
   
  // console.log("posx: "+light2Position.value.x);
  // console.log("posy: "+light2Position.value.y);
  // console.log("posz: "+light2Position.value.z);
  light2Material.needsUpdate = true;


  light3Position.value.x = 10 * Math.sin(timer);
  light3Position.value.y = 2 * Math.cos(timer)*(-1);
  light3Position.value.z = 3 * Math.cos(timer)*(-1);
   
  light3Material.needsUpdate = true;

}

// SETUP UPDATE CALL-BACK
function update() {
  incrementTimer();
  checkKeyboard();
  rotatebox();
  rotateLight();
  lightbulb.position.x = lightPosition.value.x;
  lightbulb.position.z = lightPosition.value.z;

  requestAnimationFrame(update);
  renderer.render(scene, camera);
}

update();
