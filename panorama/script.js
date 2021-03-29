/*import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js';

let camera;
let renderer;
let scene;

function init() {

    const container = document.getElementById( 'container' );

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera( 85, window.innerWidth / window.innerHeight, 0.1, 100 );
    camera.position.z = 0.01;

    // controls = new OrbitControls( camera, renderer.domElement );
    // controls.enableZoom = false;
    // controls.enablePan = false;
    // controls.enableDamping = true;
    // controls.rotateSpeed = - 0.25;

    const textures = getTexturesFromAtlasFile( "panorama.png", 6 );

    const materials = [];

    for ( let i = 0; i < 6; i ++ ) {

        materials.push( new THREE.MeshBasicMaterial( { map: textures[ i ] } ) );

    }

    const skyBox = new THREE.Mesh( new THREE.BoxGeometry( 1, 1, 1 ), materials );
    skyBox.geometry.scale( 1, 1, - 1 );
    scene.add( skyBox );

    window.addEventListener( 'resize', onWindowResize );

}

function getTexturesFromAtlasFile( atlasImgUrl, tilesNum ) {

    const textures = [];

    for ( let i = 0; i < tilesNum; i ++ ) {

        textures[ i ] = new THREE.Texture();

    }

    const imageObj = new Image();

    imageObj.onload = function () {

        let canvas, context;
        const tileWidth = imageObj.height;

        for ( let i = 0; i < textures.length; i ++ ) {

            canvas = document.createElement( 'canvas' );
            context = canvas.getContext( '2d' );
            canvas.height = tileWidth;
            canvas.width = tileWidth;
            context.drawImage( imageObj, tileWidth * i, 0, tileWidth, tileWidth, 0, 0, tileWidth, tileWidth );
            textures[ i ].image = canvas;
            textures[ i ].needsUpdate = true;

        }

    };

    imageObj.src = atlasImgUrl;

    return textures;

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}


function animate() {

    requestAnimationFrame( animate );

    camera.rotation.order = 'YXZ';
    camera.rotation.x = -0.42;

    camera.rotation.y -= 0.00024;

    renderer.render( scene, camera );

}

init();
animate();*/

import * as THREE from './three.js-dev/build/three.module.js';

var scene = new THREE.Scene();
			var camera = new THREE.PerspectiveCamera( 50, window.innerWidth/window.innerHeight, 0.1, 1000 );

			var renderer = new THREE.WebGLRenderer();
			renderer.setSize( window.innerWidth, window.innerHeight );
			document.body.appendChild( renderer.domElement );

			var geometry = new THREE.BoxGeometry( 1, 1, 1 );
			var material = new THREE.MeshBasicMaterial( { color: 0x005E99 } );
     // var material = new THREE.MeshPhongMaterial( { map:                 THREE.ImageUtils.loadTexture('https://www.gravatar.com/avatar/af8c21275e3a73b3349c0de336186106?s=256&d=identicon') } );

			var cube = new THREE.Mesh( geometry, material );
			scene.add( cube );

			camera.position.z = 5;

			var render = function () {
				requestAnimationFrame( render );

				cube.rotation.x += 0.1;
				cube.rotation.y += 0.1;

				renderer.render(scene, camera);
			};

			render();