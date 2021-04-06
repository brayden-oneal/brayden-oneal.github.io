import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js';

let camera;
let renderer;
let scene;

function init() {

    const container = document.getElementById( 'panorama' );

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera( 85, window.innerWidth / window.innerHeight, 0.1, 100 );
    camera.position.z = 0.01;

    const textures = getTexturesFromAtlasFile( "assets/textures/panorama.png", 6 );

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
    camera.rotation.x = -0.72;

    camera.rotation.y -= 0.00024;

    renderer.render( scene, camera );

}

init();
animate();