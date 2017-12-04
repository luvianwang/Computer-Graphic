/*
 * UBC CPSC 314, Vsep2017
 * Assignment 4 Template
 */

// Setup renderer
var canvas = document.getElementById('canvas');
var renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0xFFFFFF);
canvas.appendChild(renderer.domElement);

// Adapt backbuffer to window size
function resize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  lightCamera.aspect = window.innerWidth / window.innerHeight;
  lightCamera.updateProjectionMatrix();
}

// Hook up to event listener
window.addEventListener('resize', resize);
window.addEventListener('vrdisplaypresentchange', resize, true);

// Disable scrollbar function
window.onscroll = function() {
  window.scrollTo(0, 0);
}

var depthScene = new THREE.Scene(); // shadowmap
var finalScene = new THREE.Scene(); // final result

// Main camera
var camera = new THREE.PerspectiveCamera(30, 1, 0.1, 1000); // view angle, aspect ratio, near, far
camera.position.set(0,20,25);
camera.lookAt(finalScene.position);
finalScene.add(camera);

// COMMENT BELOW FOR VR CAMERA
// ------------------------------

// Giving it some controls
cameraControl = new THREE.OrbitControls(camera);
cameraControl.damping = 0.2;
cameraControl.autoRotate = false;
// ------------------------------
// COMMENT ABOVE FOR VR CAMERA



// UNCOMMENT BELOW FOR VR CAMERA
// ------------------------------
// Apply VR headset positional data to camera.
// var controls = new THREE.VRControls(camera);
// controls.standing = true;

// // Apply VR stereo rendering to renderer.
// var effect = new THREE.VREffect(renderer);
// effect.setSize(window.innerWidth, window.innerHeight);


// var display;

// // Create a VR manager helper to enter and exit VR mode.
// var params = {
//   hideButton: false, // Default: false.
//   isUndistorted: false // Default: false.
// };
// var manager = new WebVRManager(renderer, effect, params);
// ------------------------------
// UNCOMMENT ABOVE FOR VR CAMERA

// http://www.w3schools.com/games/game_sound.asp
function sound(src, repeat) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    // if (repeat) {
      this.sound.loop=repeat;
    // }
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }
}

// ------------------------------
// LOADING MATERIALS AND TEXTURES

// Shadow map camera
var shadowMapWidth = 10
var shadowMapHeight = 10
var lightDirection = new THREE.Vector3(0.49,0.79,0.49);
var lightCamera = new THREE.OrthographicCamera(shadowMapWidth / - 2, shadowMapWidth / 2, shadowMapHeight / 2, shadowMapHeight / -2, 1, 1000)
lightCamera.position.set(10, 10, 10)
lightCamera.lookAt(new THREE.Vector3(lightCamera.position - lightDirection));
depthScene.add(lightCamera);

// XYZ axis helper
var worldFrame = new THREE.AxisHelper(2);
finalScene.add(worldFrame)

// texture containing the depth values from the lightCamera POV
// anisotropy allows the texture to be viewed decently at skewed angles
var shadowMapWidth = window.innerWidth
var shadowMapHeight = window.innerHeight

// Texture/Render Target where the shadowmap will be written to
var shadowMap = new THREE.WebGLRenderTarget(shadowMapWidth, shadowMapHeight, { minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter } )

// Loading the different textures
// Anisotropy allows the texture to be viewed 'decently' at different angles
var colorMap = new THREE.TextureLoader().load('images/color.jpg')
colorMap.anisotropy = renderer.getMaxAnisotropy()
var normalMap = new THREE.TextureLoader().load('images/normal.png')
normalMap.anisotropy = renderer.getMaxAnisotropy()
var aoMap = new THREE.TextureLoader().load('images/ambient_occlusion.png')
aoMap.anisotropy = renderer.getMaxAnisotropy()

// Uniforms
var cameraPositionUniform = {type: "v3", value: camera.position }
var lightColorUniform = {type: "c", value: new THREE.Vector3(1.0, 1.0, 1.0) };
var ambientColorUniform = {type: "c", value: new THREE.Vector3(1.0, 1.0, 1.0) };
var lightDirectionUniform = {type: "v3", value: lightDirection };
var kAmbientUniform = {type: "f", value: 0.1};
var kDiffuseUniform = {type: "f", value: 0.8};
var kSpecularUniform = {type: "f", value: 0.4};
var shininessUniform = {type: "f", value: 50.0};
var lightViewMatrixUniform = {type: "m4", value: lightCamera.matrixWorldInverse};
var lightProjectMatrixUniform = {type: "m4", value: lightCamera.projectionMatrix};

var light2Position = {type: 'v3', value: new THREE.Vector3(0,5,5)};
var light3Position = {type: 'v3', value: new THREE.Vector3(5,5,5)};
// Materials
var depthMaterial = new THREE.ShaderMaterial({})

var terrainMaterial = new THREE.ShaderMaterial({
  // side: THREE.DoubleSide,
  uniforms: {
    lightColorUniform: lightColorUniform,
    ambientColorUniform: ambientColorUniform,
    lightDirectionUniform: lightDirectionUniform,
    kAmbientUniform: kAmbientUniform,
    kDiffuseUniform: kDiffuseUniform,
    kSpecularUniform, kSpecularUniform,
    shininessUniform: shininessUniform,
    colorMap: { type: "t", value: colorMap },
    normalMap: { type: "t", value: normalMap },
    aoMap: { type: "t", value: aoMap },
    shadowMap: { type: "t", value: shadowMap },
    lightViewMatrixUniform: lightViewMatrixUniform,
    lightProjectMatrixUniform: lightProjectMatrixUniform,
  },
});

var armadilloMaterial = new THREE.ShaderMaterial({
  uniforms: {
    lightColorUniform: lightColorUniform,
    ambientColorUniform: ambientColorUniform,
    lightDirectionUniform: lightDirectionUniform,
    kAmbientUniform: kAmbientUniform,
    kDiffuseUniform: kDiffuseUniform,
    kSpecularUniform, kSpecularUniform,
    shininessUniform: shininessUniform,
  },
});

var skyboxCubemap = new THREE.CubeTextureLoader()
  .setPath( 'images/cubemap/' )
  .load( [
  'cube1.png', 'cube2.png',
  'cube3.png', 'cube4.png',
  'cube5.png', 'cube6.png'
  ] );

var skyboxMaterial = new THREE.ShaderMaterial({
	uniforms: {
		skybox: { type: "t", value: skyboxCubemap },
	},
    side: THREE.DoubleSide
})

var treeMaterial = new THREE.ShaderMaterial({
  uniforms: {
    lightColorUniform: lightColorUniform,
    ambientColorUniform: ambientColorUniform,
    lightDirectionUniform: lightDirectionUniform,
    kAmbientUniform: kAmbientUniform,
    kDiffuseUniform: kDiffuseUniform,
    kSpecularUniform, kSpecularUniform,
    shininessUniform: shininessUniform,
    light2Position: light2Position,
    light3Position: light3Position,
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

var dancingArmadilloMaterial = new THREE.ShaderMaterial({
   uniforms: {
      lightColorUniform: lightColorUniform,
      ambientColorUniform: ambientColorUniform,
      lightDirectionUniform: lightDirectionUniform,
      kAmbientUniform: kAmbientUniform,
      kDiffuseUniform: kDiffuseUniform,
      kSpecularUniform, kSpecularUniform,
      shininessUniform: shininessUniform,
      light2Position: light2Position,
      light3Position: light3Position,
    time : {type: 'f', value: 0.0},
  }
})

// -------------------------------
// LOADING SHADERS
var shaderFiles = [
  'glsl/depth.vs.glsl',
  'glsl/depth.fs.glsl',

  'glsl/terrain.vs.glsl',
  'glsl/terrain.fs.glsl',

  'glsl/bphong.vs.glsl',
  'glsl/bphong.fs.glsl',

  'glsl/skybox.vs.glsl',
  'glsl/skybox.fs.glsl',

  'glsl/light2.vs.glsl',
  'glsl/light2.fs.glsl',
  'glsl/light3.vs.glsl',
  'glsl/light3.fs.glsl',
  'glsl/dancing_armadillo.vs.glsl',
  'glsl/dancing_armadillo.fs.glsl'
];

new THREE.SourceLoader().load(shaderFiles, function(shaders) {
	depthMaterial.vertexShader = shaders['glsl/depth.vs.glsl']
	depthMaterial.fragmentShader = shaders['glsl/depth.fs.glsl']
	terrainMaterial.vertexShader = shaders['glsl/terrain.vs.glsl']
	terrainMaterial.fragmentShader = shaders['glsl/terrain.fs.glsl']
	dancingArmadilloMaterial.vertexShader = shaders['glsl/dancing_armadillo.vs.glsl']
	dancingArmadilloMaterial.fragmentShader = shaders['glsl/dancing_armadillo.fs.glsl']
	skyboxMaterial.vertexShader = shaders['glsl/skybox.vs.glsl']
	skyboxMaterial.fragmentShader = shaders['glsl/skybox.fs.glsl']

	treeMaterial.vertexShader = shaders['glsl/bphong.vs.glsl']
	treeMaterial.fragmentShader = shaders['glsl/bphong.fs.glsl']

  light2Material.vertexShader = shaders['glsl/light2.vs.glsl'];
  light2Material.fragmentShader = shaders['glsl/light2.fs.glsl'];
  light3Material.vertexShader = shaders['glsl/light3.vs.glsl'];
  light3Material.fragmentShader = shaders['glsl/light3.fs.glsl'];
})

// LOAD OBJ ROUTINE
// mode is the scene where the model will be inserted
function loadOBJ(scene, file, material, scale, xOff, yOff, zOff, xRot, yRot, zRot) {
  var onProgress = function(query) {
    if (query.lengthComputable) {
      var percentComplete = query.loaded / query.total * 100;
      console.log(Math.round(percentComplete, 2) + '% downloaded');
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

    object.position.set(xOff, yOff, zOff);
    object.rotation.x = xRot;
    object.rotation.y = yRot;
    object.rotation.z = zRot;
    object.scale.set(scale, scale, scale);
    scene.add(object)
  }, onProgress, onError);
}

// -------------------------------
// ADD OBJECTS TO THE SCENE

var skyboxGeometry = new THREE.BoxGeometry(1000, 1000, 1000, 1, 1, 1);
var skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial);
finalScene.add(skybox)
var skyboxDO = new THREE.Mesh(skyboxGeometry, skyboxMaterial);
depthScene.add(skyboxDO);

var terrainGeometry = new THREE.PlaneBufferGeometry(10, 10);
var terrain = new THREE.Mesh(terrainGeometry, terrainMaterial)
terrain.rotation.set(-1.57, 0, 0)
finalScene.add(terrain)
var terrainDO = new THREE.Mesh(terrainGeometry, depthMaterial)
terrainDO.rotation.set(-1.57, 0, 0)
depthScene.add(terrainDO)


loadOBJ(finalScene, 'obj/armadillo.obj', dancingArmadilloMaterial, 1.0, 3, 1.0, -3, 0, 3, 0)
loadOBJ(depthScene, 'obj/armadillo.obj', depthMaterial, 1.0, 3, 1.0, -3, 0, 3, 0)

// var onProgress = function ( xhr ) {
// 					if ( xhr.lengthComputable ) {
// 						var percentComplete = xhr.loaded / xhr.total * 100;
// 						console.log( Math.round(percentComplete, 2) + '% downloaded' );
// 					}
// 				};
// 				var onError = function ( xhr ) { };
// 				THREE.Loader.Handlers.add( /\.dds$/i, new THREE.DDSLoader() );
// 				var mtlLoader = new THREE.MTLLoader();
// 				mtlLoader.setPath( 'obj/' );
// 				mtlLoader.load( 'christmas_tree.mtl', function( materials ) {
// 					materials.preload();
// 					var objLoader = new THREE.OBJLoader();
// 					objLoader.setMaterials( materials );
// 					objLoader.setPath( 'obj/' );
// 					objLoader.load( 'christmas_tree.obj', function ( object ) {
// 						object.position.x = 0;
// 						object.position.y = 0;
// 						finalScene.add( object );
// 					}, onProgress, onError );
// 				});

loadOBJ(finalScene,'obj/christmas_tree.obj', treeMaterial, 4.0, 0, 0.0, 0, 0, 0, 0);
loadOBJ(depthScene,'obj/christmas_tree.obj', depthMaterial, 4.0, 0, 0.0, 0, 0, 0, 0);

var mirrorSphereMat = new THREE.SphereGeometry(0.3, 32, 32);
mirrorSphereCamera = new THREE.CubeCamera(1, 1000, 256);
finalScene.add( mirrorSphereCamera );
var mirrorSphereMaterial = new THREE.MeshBasicMaterial( { envMap: mirrorSphereCamera.renderTarget } );
mirrorSphere = new THREE.Mesh( mirrorSphereMat, mirrorSphereMaterial );
mirrorSphere.position.set(-3,5,2);
mirrorSphereCamera.position.set(-3,5,2);
finalScene.add(mirrorSphere);


var tetrahedron = new THREE.TetrahedronGeometry(0.5, 0);
var tetrahedronCamera = new THREE.CubeCamera(1, 1000, 256);
finalScene.add( tetrahedronCamera );
var tetrahedronMaterial = new THREE.MeshBasicMaterial( { envMap: tetrahedronCamera.renderTarget } );
tetrahedron = new THREE.Mesh( tetrahedron, tetrahedronMaterial );
tetrahedron.position.set(3,5,-2);
tetrahedronCamera.position.set(3,5,-2);
finalScene.add(tetrahedron);

var light2Geometry = new THREE.SphereGeometry(0.3, 32, 32);
var light2 = new THREE.Mesh(light2Geometry, light2Material);
light2.parent = worldFrame;
finalScene.add(light2);

var light3Geometry = new THREE.SphereGeometry(0.3, 32, 32);
var light3 = new THREE.Mesh(light3Geometry, light3Material);
light2.parent = worldFrame;
finalScene.add(light3);

var backgroundMusic = new sound("./music/jingle-bells-country.mp3", true);
backgroundMusic.play();

var mesh=new THREE.Mesh();
var loader = new THREE.FontLoader();
loader.load( 'js/helvetiker_regular.typeface.js', function ( font ) {
  var textGeometry = new THREE.TextGeometry( "Merry Christmas !", {
    font: font,
    size: 1,
    height: 0.5,
  });
  var materialFront = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
  var materialSide = new THREE.MeshBasicMaterial( { color: 0x000088 } );
  var materialArray = [ materialFront, materialSide ];
  var textMaterial = new THREE.MeshFaceMaterial(materialArray);

  mesh = new THREE.Mesh( textGeometry, textMaterial );
  mesh.position.x = -5;
  mesh.position.y = 5;
  mesh.position.z = 5;
  mesh.rotation.x = -Math.PI /3;

  finalScene.add( mesh );

});

// -------------------------------
// UPDATE ROUTINES
var keyboard = new THREEx.KeyboardState();

function checkKeyboard() { }

function updateMaterials() {
	cameraPositionUniform.value = camera.position

	depthMaterial.needsUpdate = true
	terrainMaterial.needsUpdate = true
	dancingArmadilloMaterial.needsUpdate = true
	skyboxMaterial.needsUpdate = true
	treeMaterial.needsUpdate = true
  mirrorSphereMaterial.needsUpdate = true
  tetrahedronMaterial.needsUpdate = true
  light2Material.needsUpdate = true;
    light3Material.needsUpdate = true;
}


var clock = new THREE.Clock();
// Update routine
function update() {
	checkKeyboard()

  var time = Date.now();

  var time2 = clock.getElapsedTime();
  dancingArmadilloMaterial.uniforms['time'].value = time2;
  mesh.rotation.x+= Math.PI/160;
  light2Position.value.x = 5 * Math.sin(0.001*time)*(-1);
  light2Position.value.z = 5 * Math.cos(0.001*time);
  light3Position.value.x = 10 * Math.sin(0.001*time);
  light3Position.value.y = 2 * Math.cos(0.001*time)*(-1)+5;
  light3Position.value.z = 3 * Math.cos(0.001*time)*(-1);

  mirrorSphere.position.y = 2*Math.sin(0.001*time) +3;
  mirrorSphere.rotation.x += 0.01;
  mirrorSphere.rotation.z += 0.01;

  tetrahedron.position.y = -2*Math.sin(0.001*time) +6;
  tetrahedron.rotation.x += 0.01;
  tetrahedron.rotation.z += 0.01;

  mirrorSphereCamera.position = mirrorSphere.position;
  mirrorSphere.visible = false;
  mirrorSphereCamera.updateCubeMap( renderer, finalScene );
  mirrorSphere.visible = true;

  tetrahedronCamera.position = tetrahedron.position;
  tetrahedron.visible = false;
  tetrahedronCamera.updateCubeMap( renderer, finalScene );
  tetrahedron.visible = true;

  updateMaterials()
  requestAnimationFrame(update)
  renderer.render(depthScene, lightCamera, shadowMap)
  renderer.render(finalScene, camera)
}

resize()
update();
