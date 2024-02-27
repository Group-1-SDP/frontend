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
        camera.position.z = 3;
        camera.position.y = 1.2;

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
            //Load Model
            const model = gltf.scene;
            model.rotateY(-Math.PI / 1.6);
            scene.add(model);
            mixer = new THREE.AnimationMixer(model);

            //Load Animations
            const clips = gltf.animations;
            const tickboxAction = mixer.clipAction(THREE.AnimationClip.findByName(clips, 'TickboxAction'));
            const phoneAction = mixer.clipAction(THREE.AnimationClip.findByName(clips, 'PhoneAction'));
            tickboxAction.setLoop( THREE.LoopOnce, 1 );
            phoneAction.setLoop( THREE.LoopOnce, 1 );

            //Play Animation
            let playedAnimation = false;
            window.addEventListener('click', () => {
                if(tickboxAction.isRunning() || phoneAction.isRunning()){
                    return;
                }

                if (playedAnimation === false) {
                    tickboxAction.timeScale = 1;
                    tickboxAction.reset().play();
                    tickboxAction.clampWhenFinished = true;

                    phoneAction.timeScale = 1;
                    phoneAction.reset().play(); 
                    phoneAction.clampWhenFinished = true;

                    playedAnimation = true;
                    console.log(1);
                } else {
                    tickboxAction.timeScale = -1;
                    tickboxAction.reset().play();
                    tickboxAction.time = tickboxAction.getClip().duration;

                    phoneAction.timeScale = -1;
                    phoneAction.reset().play(); 
                    phoneAction.time = phoneAction.getClip().duration;
                
                    playedAnimation = false;
                    console.log(2);
                }
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
