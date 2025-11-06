import * as THREE from 'three';

function main() {
    const canvas = document.querySelector('#qwe');
    const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10);
    camera.position.z = 2;

    // --- Create two cubes ---
    const geometry = new THREE.BoxGeometry(1, 1, 1);

    const material1 = new THREE.MeshPhongMaterial({ color: 0x44aa88 });
    const material2 = new THREE.MeshPhongMaterial({ color: 0xaa8844 });

    const cube1 = new THREE.Mesh(geometry, material1);
    const cube2 = new THREE.Mesh(geometry, material2);

    // Position them apart
    cube1.position.x = -1.2;
    cube2.position.x = 1.2;

    scene.add(cube1);
    scene.add(cube2);

    // --- Light setup ---
    const light = new THREE.DirectionalLight(0xffffff, 3);
    light.position.set(-1, 2, 4);
    scene.add(light);

    // --- Resize handling ---
    window.addEventListener('resize', () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // --- Light Controls ---
    const lightIntensity = document.querySelector('#lightIntensity');
    const lightX = document.querySelector('#lightX');
    const lightY = document.querySelector('#lightY');
    const lightZ = document.querySelector('#lightZ');
    const lightColor = document.querySelector('#lightColor');

    lightIntensity.addEventListener('input', (e) => {
        light.intensity = parseFloat(e.target.value);
    });
    lightX.addEventListener('input', (e) => {
        light.position.x = parseFloat(e.target.value);
    });
    lightY.addEventListener('input', (e) => {
        light.position.y = parseFloat(e.target.value);
    });
    lightZ.addEventListener('input', (e) => {
        light.position.z = parseFloat(e.target.value);
    });
    lightColor.addEventListener('input', (e) => {
        light.color.set(e.target.value);
    });

    // --- Camera Controls ---
    const camX = document.querySelector('#camX');
    const camY = document.querySelector('#camY');
    const camZ = document.querySelector('#camZ');

    camX.addEventListener('input', (e) => {
        camera.position.x = parseFloat(e.target.value);
    });
    camY.addEventListener('input', (e) => {
        camera.position.y = parseFloat(e.target.value);
    });
    camZ.addEventListener('input', (e) => {
        camera.position.z = parseFloat(e.target.value);
    });

    // --- Render Loop ---
    function render(time) {
        time *= 0.001;

        // Rotate both cubes differently
        cube1.rotation.x = time;
        cube1.rotation.y = time * -1.2;
        cube2.rotation.x = time * -0.8;
        cube2.rotation.y = time;

        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
}

main();
