import { useAtom } from "jotai";
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { phoneConnectedState } from "../../App";

interface ModelProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  width: number;
  height: number;
  zCamPosition: number;
  yCamPosition: number;
  FOV: number;
  rotateY: number;
  mirror: boolean;
}

function Model({
  canvasRef,
  width,
  height,
  zCamPosition,
  yCamPosition,
  FOV,
  rotateY,
  mirror,
}: ModelProps) {
  const [phoneConnected] = useAtom(phoneConnectedState);
  const [playStart, setPlayStart] = useState(true);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(FOV, width / height, 0.1, 1000);
    camera.position.set(0, yCamPosition, zCamPosition);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: canvasRef.current,
    });
    renderer.setSize(width, height);
    renderer.setClearColor(0xffffff);

    // OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enableZoom = false;
    controls.enablePan = false;

    // Save the default position
    const defaultCamPos = new THREE.Vector3(0, yCamPosition, zCamPosition);
    let shouldAutoRotateBack = false;
    let movedOnce = false;
    controls.addEventListener("start", function () {
      shouldAutoRotateBack = false;
      movedOnce = true;
    });
    controls.addEventListener("end", function () {
      shouldAutoRotateBack = true;
    });

    //Start animation
    if (playStart) {
      camera.position.set(0, -5, 0.5);
    }

    //Mixer
    let mixer: THREE.AnimationMixer;

    // GLTFLoader
    let globalModel: THREE.Group<THREE.Object3DEventMap>;
    const loader = new GLTFLoader();
    loader.load("src/assets/tickbox1.glb", function (gltf) {
      //Load Model
      const model = gltf.scene;

      if (mirror) {
        model.scale.x = -1;
      }

      const targetPositionConnected = new THREE.Vector3(
        -1,
        model.position.y,
        model.position.z
      );
      const targetPositionDisconnected = new THREE.Vector3(
        -1.5,
        model.position.y,
        model.position.z
      );

      model.rotateY(-Math.PI / rotateY);
      globalModel = model;
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
      if (phoneConnected) {
        tickboxAction.timeScale = 1;
        tickboxAction.reset().play();
        tickboxAction.clampWhenFinished = true;

        phoneAction.timeScale = 1;
        phoneAction.reset().play();
        phoneAction.clampWhenFinished = true;
      } else {
        tickboxAction.timeScale = -1;
        tickboxAction.reset().play();
        tickboxAction.time = tickboxAction.getClip().duration;

        phoneAction.timeScale = -1;
        phoneAction.reset().play();
        phoneAction.time = phoneAction.getClip().duration;
      }

      // Animation Loop
      const clock = new THREE.Clock();
      let frameCounter = 0;
      const animate = () => {
        if (mixer) mixer.update(clock.getDelta());
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);

        const targetPosition = phoneConnected
          ? targetPositionConnected
          : targetPositionDisconnected;
        globalModel.position.lerp(targetPosition, 0.03);

        if (shouldAutoRotateBack) {
          camera.position.lerp(defaultCamPos, 0.03);
        }
        if (playStart) {
          frameCounter++;
          if (frameCounter > 200 || movedOnce) {
            setPlayStart(false);
          } else {
            camera.position.lerp(defaultCamPos, 0.02);
          }
        }
      };
      animate();
    });

    // //Help visualize axis
    // const axesHelper = new THREE.AxesHelper(5);
    // axesHelper.setColors(0x00ff00, 0xff0000, 0x0000ff);
    // scene.add(axesHelper);
  }, [
    width,
    height,
    canvasRef,
    zCamPosition,
    yCamPosition,
    FOV,
    rotateY,
    mirror,
    phoneConnected,
  ]);

  return null;
}

export default Model;
