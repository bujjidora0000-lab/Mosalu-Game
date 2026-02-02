// Loading Logic
let progress = 0;
const progressBar = document.getElementById('progress-bar');
const loadingScreen = document.getElementById('loading-screen');
const gameUI = document.getElementById('game-ui');

const loadingInterval = setInterval(() => {
    progress += 2;
    progressBar.style.width = progress + '%';
    if (progress >= 100) {
        clearInterval(loadingInterval);
        loadingScreen.style.display = 'none';
        gameUI.style.display = 'block';
        initMosaluGame();
    }
}, 30);

// 3D Game Engine
function initMosaluGame() {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87CEEB);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 10, 7.5).normalize();
    scene.add(light);

    // Initial Platform (Cloud)
    const cloudGeo = new THREE.BoxGeometry(4, 0.5, 4);
    const cloudMat = new THREE.MeshLambertMaterial({ color: 0xffffff });
    const cloud = new THREE.Mesh(cloudGeo, cloudMat);
    scene.add(cloud);

    // Rabbit (Placeholder Box)
    const rabbitGeo = new THREE.BoxGeometry(1, 1, 1);
    const rabbitMat = new THREE.MeshLambertMaterial({ color: 0xeeeeee });
    const rabbit = new THREE.Mesh(rabbitGeo, rabbitMat);
    rabbit.position.y = 1;
    scene.add(rabbit);

    camera.position.set(0, 5, 10);
    camera.lookAt(rabbit.position);

    function animate() {
        requestAnimationFrame(animate);
        // Slowly rotate cloud to show 3D effect
        cloud.rotation.y += 0.005;
        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}
