let btn_leftDoor = document.getElementById('btn_leftDoor');
let btn_rightDoor = document.getElementById('btn_rightDoor');
let btn_botDrawer = document.getElementById('btn_botDrawer');
let btn_topDrawer = document.getElementById('btn_topDrawer');

let scene = new THREE.Scene()
scene.background = new THREE.Color(0xE5E5DA)
let camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 )
let myCanvas = document.getElementById('canvas')
var renderer = new THREE.WebGLRenderer({ canvas: myCanvas });
document.body.appendChild(renderer.domElement);

renderer.setSize( window.innerWidth/2, window.innerHeight/2)
renderer.shadowMap.enabled = true
let controls = new THREE.OrbitControls(camera, renderer.domElement)
let material = new THREE.Mesh('models/textures');

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
        
        rack = scene.getObjectByName('rack');
        rack.material.map = textureLoader.load("models/textures/Wood1.png");

        doorRight = scene.getObjectByName('Cube015');
        doorRight.material.map = textureLoader.load("models/textures/Wicker001_1K_Color.png");
        
        doorLeft = scene.getObjectByName('Cube009');
        doorLeft.material.map = textureLoader.load("models/textures/Wicker001_1K_Color.png");
})

btn_leftDoor.addEventListener('click', function leftDoorOpen(){
    leftDoor.play()
});

btn_rightDoor.addEventListener('click', function rightDoorOpen(){
    rightDoor.play()
})

btn_topDrawer.addEventListener('click', function topDrawerOpen(){
    topDrawer.play()
})

btn_botDrawer.addEventListener('click', function botDrawerOpen(){
    botDrawer.play()
})

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

function changeMaterial(material){
    switch(material){
    }
}