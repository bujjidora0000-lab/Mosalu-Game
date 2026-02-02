// 1. லோடிங் பார் லாஜிக்
let progress = 0;
const progressBar = document.getElementById('progress-bar');
const loadingScreen = document.getElementById('loading-screen');
const gameUI = document.getElementById('game-ui');

const loadingInterval = setInterval(() => {
    progress += 2; // லோடிங் வேகம்
    progressBar.style.width = progress + '%';

    if (progress >= 100) {
        clearInterval(loadingInterval);
        loadingScreen.style.display = 'none'; // லோடிங் திரை மறையும்
        gameUI.style.display = 'block';      // ஸ்கோர் மற்றும் லைஃப் தெரியும்
        initMosaluGame();                    // 3D கேம் தொடங்கும்
    }
}, 50);

// 2. 3D கேம் அமைப்பு (Three.js)
function initMosaluGame() {
    // சீன் (Scene) மற்றும் கேமரா (Camera)
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87CEEB); // வானம் நிறம்

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // வெளிச்சம் (Light)
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 10, 7.5).normalize();
    scene.add(light);

    // ஒரு தற்காலிக தரை (Floor) - பின்னாடி மேகங்களாக மாற்றுவோம்
    const geometry = new THREE.PlaneGeometry(100, 100);
    const material = new THREE.MeshLambertMaterial({ color: 0x228B22 });
    const floor = new THREE.Mesh(geometry, material);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -2;
    scene.add(floor);

    // 'Mosalu' - முயலுக்குப் பதில் ஒரு தற்காலிக பாக்ஸ்
    const mosaluGeo = new THREE.BoxGeometry(1, 1, 1);
    const mosaluMat = new THREE.MeshLambertMaterial({ color: 0xffffff });
    const mosalu = new THREE.Mesh(mosaluGeo, mosaluMat);
    scene.add(mosalu);

    camera.position.z = 10;
    camera.position.y = 5;
    camera.lookAt(mosalu.position);

    // அனிமேஷன் லூப்
    function animate() {
        requestAnimationFrame(animate);
        
        // முயல் லேசாக ஆடுவது போல (அனிமேஷன் செக் செய்ய)
        mosalu.rotation.y += 0.01;
        
        renderer.render(scene, camera);
    }
    animate();

    // ஸ்கிரீன் அளவு மாறும்போது அட்ஜஸ்ட் செய்ய
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}
