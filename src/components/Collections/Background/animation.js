import styles from './animation.module.scss';
import * as THREE from 'three';
import { useEffect } from 'react';
import { gsap } from 'gsap';
const Animation = () => {
  const mathRandom = (num = 8) => {
    const numValue = -Math.random() * num + Math.random() * num;
    return numValue;
  };
  // Building Colors //
  let setTintNum = true;
  const setTintColor = () => {
    let setColor;
    if (setTintNum) {
      setTintNum = false;
      setColor = 0x000000;
    } else {
      setTintNum = true;
      setColor = 0x000000;
    }
    return setColor;
  };

  useEffect(() => {
    let createCarPos = true;
    const setcolor = 0xf02050;
    // Debug
    // const gui = new dat.GUI();
    const canvas = document.getElementsByClassName(styles.animation)[0];
    // Scenes //
    const scene = new THREE.Scene();
    const city = new THREE.Object3D();
    const smoke = new THREE.Object3D();
    const town = new THREE.Object3D();
    scene.background = new THREE.Color(setcolor);
    scene.fog = new THREE.Fog(setcolor, 10, 16);
    smoke.position.y = 2;
    // Camera
    const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(2, 4.5, 14);
    scene.add(camera);
    // Lights //
    const ambientLight = new THREE.AmbientLight(0xffffff, 4);
    const lightFront = new THREE.SpotLight(0xffffff, 20, 10);
    const lightBack = new THREE.PointLight(0xffffff, 0.5);

    lightFront.rotation.x = (45 * Math.PI) / 180;
    lightFront.rotation.z = (-45 * Math.PI) / 180;
    lightFront.position.set(5, 5, 5);
    lightFront.castShadow = true;
    lightFront.shadow.mapSize.width = 6000;
    lightFront.shadow.mapSize.height = lightFront.shadow.mapSize.width;
    lightFront.penumbra = 0.1;
    lightBack.position.set(0, 6, 0);
    // Render //
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    // Animate //

    window.addEventListener('resize', () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });

    // Animate //
    const mouse = new THREE.Vector2();
    const animate = () => {
      city.rotation.y -= (mouse.x * 8 - camera.rotation.y) * 0.001;
      city.rotation.x -= (-(mouse.y * 2) - camera.rotation.x) * 0.001;
      if (city.rotation.x < -0.05) city.rotation.x = -0.05;
      else if (city.rotation.x > 1) city.rotation.x = 5;
      camera.lookAt(city.position);
      smoke.rotation.y += 0.01;
      smoke.rotation.x += 0.01;
      camera.updateProjectionMatrix();
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    // Create city //
    const init = () => {
      const segments = 2;
      for (let i = 1; i < 100; i++) {
        const geometry = new THREE.BoxGeometry(1, 1, 1, segments, segments, segments);
        const material = new THREE.MeshStandardMaterial({
          color: setTintColor(),
          wireframe: false,
          flatShading: true,
          side: THREE.DoubleSide,
        });
        const wmaterial = new THREE.MeshLambertMaterial({
          color: 0xffffff,
          wireframe: true,
          transparent: true,
          opacity: 0.03,
          side: THREE.DoubleSide,
        });

        const cube = new THREE.Mesh(geometry, material);
        const floor = new THREE.Mesh(geometry, material);
        const wfloor = new THREE.Mesh(geometry, wmaterial);

        cube.add(wfloor);
        cube.castShadow = true;
        cube.receiveShadow = true;
        cube.rotationValue = 0.1 + Math.abs(mathRandom(8));

        floor.scale.y = 0.05;
        cube.scale.y = 0.1 + Math.abs(mathRandom(8));

        const cubeWidth = 0.9;
        cube.scale.x = cube.scale.z = cubeWidth + mathRandom(1 - cubeWidth);
        cube.position.x = Math.round(mathRandom());
        cube.position.z = Math.round(mathRandom());

        floor.position.set(cube.position.x, 0, cube.position.z);

        town.add(floor);
        town.add(cube);
      }

      const gmaterial = new THREE.MeshToonMaterial({
        color: 0xffff00,
        side: THREE.DoubleSide,
      });
      const gparticular = new THREE.CircleGeometry(0.01, 3);
      const aparticular = 5;

      for (let h = 1; h < 300; h++) {
        const particular = new THREE.Mesh(gparticular, gmaterial);
        particular.position.set(mathRandom(aparticular), mathRandom(aparticular), mathRandom(aparticular));
        particular.rotation.set(mathRandom(), mathRandom(), mathRandom());
        smoke.add(particular);
      }

      const pmaterial = new THREE.MeshStandardMaterial({
        color: 0x000000,
        side: THREE.DoubleSide,
        roughness: 10,
        metalness: 0.6,
        opacity: 0.9,
        transparent: true,
      });
      const pgeometry = new THREE.PlaneGeometry(60, 60);
      const pelement = new THREE.Mesh(pgeometry, pmaterial);
      pelement.rotation.x = (-90 * Math.PI) / 180;
      pelement.position.y = -0.001;
      pelement.receiveShadow = true;
      city.add(pelement);
    };
    const gridHelper = new THREE.GridHelper(60, 120, 0xff0000, 0x000000);
    city.add(gridHelper);

    const createCars = function (cScale = 2, cPos = 20, cColor = 0xffff00) {
      const cMat = new THREE.MeshToonMaterial({
        color: cColor,
        side: THREE.DoubleSide,
      });
      const cGeo = new THREE.BoxGeometry(1, cScale / 40, cScale / 40);
      const cElem = new THREE.Mesh(cGeo, cMat);
      const cAmp = 3;

      if (createCarPos) {
        createCarPos = false;
        cElem.position.x = -cPos;
        cElem.position.z = mathRandom(cAmp);

        gsap.to(cElem.position, 3, {
          x: cPos,
          repeat: -1,
          yoyo: true,
          delay: mathRandom(3),
        });
      } else {
        createCarPos = true;
        cElem.position.x = mathRandom(cAmp);
        cElem.position.z = -cPos;
        cElem.rotation.y = (90 * Math.PI) / 180;

        gsap.to(cElem.position, 5, {
          z: cPos,
          repeat: -1,
          yoyo: true,
          delay: mathRandom(3),
        });
      }
      cElem.receiveShadow = true;
      cElem.castShadow = true;
      cElem.position.y = Math.abs(mathRandom(5));
      city.add(cElem);
    };
    const generateLines = function () {
      for (let i = 0; i < 60; i++) {
        createCars(0.1, 20);
      }
    };

    scene.add(ambientLight);
    city.add(lightFront);
    scene.add(lightBack);
    scene.add(city);
    city.add(smoke);
    city.add(town);
    generateLines();
    animate();
    init();
    return () => {
      for (let i = scene.children.length - 1; i >= 0; i--) {
        const obj = scene.children[i];
        scene.remove(obj);
      }
    };
  }, []);
  return (
    <>
      <canvas className={styles.animation}></canvas>
    </>
  );
};

export default Animation;
