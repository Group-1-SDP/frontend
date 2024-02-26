import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

interface ModelProps {
    canvasRef: React.RefObject<HTMLCanvasElement>; 
    width: number;
    height: number;
}

function Model({ canvasRef, width, height }: ModelProps) {

    useEffect(() => {
        if(!canvasRef.current){
            return;
        }
        // Scene
        const scene = new THREE.Scene();

        // Camera
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 5;

        // Renderer
        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            canvas: canvasRef.current,
        });
        renderer.setSize(width, height);
        renderer.setClearColor(0xffffff);

        // OrbitControls
        const controls = new OrbitControls(camera, renderer.domElement);

        //Mixer
        let mixer: THREE.AnimationMixer;

        // GLTFLoader
        const loader = new GLTFLoader();
        loader.load('src/assets/tickbox1.glb', function (gltf) {
            const model = gltf.scene;
            scene.add(model);
            mixer = new THREE.AnimationMixer(model);
            const clips = gltf.animations;
            const tickboxAction = mixer.clipAction(THREE.AnimationClip.findByName(clips, 'TickboxAction'));
            const phoneAction = mixer.clipAction(THREE.AnimationClip.findByName(clips, 'PhoneAction'));
            tickboxAction.setLoop( THREE.LoopOnce, 1 );
            phoneAction.setLoop( THREE.LoopOnce, 1 );

            window.addEventListener('click', () => {
                if(tickboxAction.isRunning() || phoneAction.isRunning()){
                    return;
                }
                tickboxAction.reset().play();
                tickboxAction.clampWhenFinished = true;
                phoneAction.reset().play();
                phoneAction.clampWhenFinished = true;
            });
        });

        // Animation Loop
        const clock = new THREE.Clock();
        const animate = () => {
            if (mixer) mixer.update(clock.getDelta());
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };
        animate();
    }, [width, height, canvasRef]);

    return (
        null
    );
}

export default Model;
