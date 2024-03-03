import { useAtom } from "jotai";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { phoneConnectedState } from "../../App";

interface ModelProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  width: number;
  height: number;
}

function Model({ canvasRef, width, height }: ModelProps) {
  const [phoneConnected] = useAtom(phoneConnectedState);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 2.7;
    camera.position.y = 1;

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
    loader.load("src/assets/tickbox1.glb", function (gltf) {
      //Load Model
      const model = gltf.scene;
      model.rotateY(-Math.PI / 1.6);
      scene.add(model);
      mixer = new THREE.AnimationMixer(model);

      //Load Animations
      const clips = gltf.animations;
      const tickboxAction = mixer.clipAction(
        THREE.AnimationClip.findByName(clips, "TickboxAction")
      );
      const phoneAction = mixer.clipAction(
        THREE.AnimationClip.findByName(clips, "PhoneAction")
      );
      tickboxAction.setLoop(THREE.LoopOnce, 1);
      phoneAction.setLoop(THREE.LoopOnce, 1);

      //Play Animation
      if (phoneConnected === true) {
        tickboxAction.timeScale = 1;
        tickboxAction.reset().play();
        tickboxAction.clampWhenFinished = true;

        phoneAction.timeScale = 1;
        phoneAction.reset().play();
        phoneAction.clampWhenFinished = true;
      } 
      else {
        tickboxAction.timeScale = -1;
        tickboxAction.reset().play();
        tickboxAction.time = tickboxAction.getClip().duration;

        phoneAction.timeScale = -1;
        phoneAction.reset().play();
        phoneAction.time = phoneAction.getClip().duration;
      }
    });

    //Help visualize axis
    const axesHelper = new THREE.AxesHelper( 5 );
    axesHelper.setColors(0x00ff00,0xff0000,0x0000ff)
    scene.add( axesHelper );

    // Animation Loop
    const clock = new THREE.Clock();
    const animate = () => {
      if (mixer) mixer.update(clock.getDelta());
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();
  }, [width, height, canvasRef, phoneConnected]);

  return null;
}

export default Model;
