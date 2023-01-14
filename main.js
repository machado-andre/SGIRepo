//#region html vars
let btn_openLeftDoor = document.getElementById('btn_openLeftDoor');
let btn_closeLeftDoor = document.getElementById('btn_closeLeftDoor');
let btn_openRightDoor = document.getElementById('btn_openRightDoor');
let btn_closeRightDoor = document.getElementById('btn_closeRightDoor');
let btn_openBotDrawer = document.getElementById('btn_openBotDrawer');
let btn_closeBotDrawer = document.getElementById('btn_closeBotDrawer');
let btn_openTopDrawer = document.getElementById('btn_openTopDrawer');
let btn_closeTopDrawer = document.getElementById('btn_closeTopDrawer');
let darkWood = document.getElementById('darkWood');
let lightWood = document.getElementById('lightWood');
let oakWood = document.getElementById('oakWood');
let silk = document.getElementById('silk');
let woodenNet = document.getElementById('woodenNet');
//#endregion
let scene = new THREE.Scene()
scene.background = new THREE.Color(0xE5E5DA)
let camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 100 )
let myCanvas = document.getElementById('canvas')
var renderer = new THREE.WebGLRenderer({ canvas: myCanvas });
document.body.appendChild(renderer.domElement);

renderer.setSize( window.innerWidth/2, window.innerHeight/2)
renderer.shadowMap.enabled = true
let controls = new THREE.OrbitControls(camera, renderer.domElement)
renderer.toneMapping = THREE.ReinhardToneMapping;
renderer.toneMappingExposure = 4;
var textureLoader = new THREE.TextureLoader();

// Clock
var clock = new THREE.Clock();
// Animation Mixer
var animMixer = new THREE.AnimationMixer(scene);

camera.position.x = -5
camera.position.y = 8
camera.position.z = 13
camera.lookAt(0,2,0)



new THREE.GLTFLoader().load(
    'models/TV.gltf', 
    function ( gltf ) {
        scene.add( gltf.scene )
        scene.traverse( function(x) {
            if (x.isMesh) {
                x.castShadow = true
                x.receiveShadow = true
            }

        })
        console.log(scene);
        
        //#region materials
        rack = scene.getObjectByName('rack');
        tvScreen = scene.getObjectByName('Plane002')
        doorRight = scene.getObjectByName('Cube015');
        doorLeft = scene.getObjectByName('Cube009');
        plane = scene.getObjectByName('plane');
        //tvScreen.material = textureLoader.load("models/textures/meme.png")
        plane.material.map = textureLoader.load("models/textures/tileStone.png")
        rack.material.map = textureLoader.load("models/textures/darkWood.png");
        doorRight.material.map = textureLoader.load("models/textures/woodenNet.png");
        doorLeft.material.map = textureLoader.load("models/textures/woodenNet.png");
        //#endregion

        leftDoorOpen = THREE.AnimationClip.findByName(gltf.animations, 'leftDoorOpen')
        rightDoorOpen = THREE.AnimationClip.findByName(gltf.animations, 'rightDoorOpen')
        topDrawerOpen = THREE.AnimationClip.findByName(gltf.animations, 'topDrawerOpen')
        botDrawerOpen = THREE.AnimationClip.findByName(gltf.animations, 'botDrawerOpen')
        // Clips it
        leftDoor = animMixer.clipAction(leftDoorOpen)
        rightDoor = animMixer.clipAction(rightDoorOpen)
        topDrawer = animMixer.clipAction(topDrawerOpen)
        botDrawer = animMixer.clipAction(botDrawerOpen)
        // Plays it
        //action.play()
        leftDoor.setLoop(THREE.LoopOnce)
        rightDoor.setLoop(THREE.LoopOnce)
        topDrawer.setLoop(THREE.LoopOnce)
        botDrawer.setLoop(THREE.LoopOnce)
        leftDoor.clampWhenFinished = true;
        rightDoor.clampWhenFinished = true;
        topDrawer.clampWhenFinished = true;
        botDrawer.clampWhenFinished = true;

})

//#region animations

btn_openLeftDoor.addEventListener('click', function (){
    leftDoor.timeScale = 1;
    leftDoor.paused = false;
    leftDoor.play()
});
btn_closeLeftDoor.addEventListener('click', function (){
    leftDoor.timeScale = -1;
    leftDoor.paused = false;
});


btn_openRightDoor.addEventListener('click', function (){
    rightDoor.timeScale = 1;
    rightDoor.paused = false;
    rightDoor.play()
})
btn_closeRightDoor.addEventListener('click', function (){
    rightDoor.timeScale = -1;
    rightDoor.paused = false;
})


btn_openBotDrawer.addEventListener('click', function (){
    botDrawer.timeScale = 1;
    botDrawer.paused = false;
    botDrawer.play();
})
btn_closeBotDrawer.addEventListener('click', function (){
    botDrawer.timeScale = -1;
    botDrawer.paused = false;
})


btn_openTopDrawer.addEventListener('click', function (){
    topDrawer.timeScale = 1;
    topDrawer.paused = false;
    topDrawer.play();
})
btn_closeTopDrawer.addEventListener('click', function (){
    topDrawer.timeScale = -1;
    topDrawer.paused = false;
})
//#endregion

//#region applying materials
darkWood.addEventListener('click', function (){
    rack.material.map = textureLoader.load("models/textures/darkWood.png");
})

lightWood.addEventListener('click', function (){
    rack.material.map = textureLoader.load("models/textures/lightWood.png");
})

oakWood.addEventListener('click', function (){
    rack.material.map = textureLoader.load("models/textures/oakWood.png");
})

silk.addEventListener('click', function (){
    doorRight.material.map = textureLoader.load("models/textures/silk.png");
    doorLeft.material.map = textureLoader.load("models/textures/silk.png");
})

woodenNet.addEventListener('click', function (){
    doorRight.material.map = textureLoader.load("models/textures/woodenNet.png");
    doorLeft.material.map = textureLoader.load("models/textures/woodenNet.png");
})
//#endregion



addLights()
animate()

function animate() {
    requestAnimationFrame( animate )
    
    animMixer.update(clock.getDelta())

    renderer.render( scene, camera )
}

function addLights(){
    const lightAmb = new THREE.AmbientLight( 0xffffff, 0.5); 
    scene.add( lightAmb );

    const lightDir = new THREE.DirectionalLight( 0xE5E5DA, 1 );
    lightDir.position.set(2,8,10)
    scene.add( lightDir );
}


