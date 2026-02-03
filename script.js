// 1. Setup Loading Manager
const loadingManager = new THREE.LoadingManager();

loadingManager.onProgress = function (url, itemsLoaded, itemsTotal) {
    const progressPercent = (itemsLoaded / itemsTotal) * 100;
    document.getElementById('progress').style.width = progressPercent + '%';
    document.getElementById('loading-text').innerText = 'Loading Assets... ' + Math.round(progressPercent) + '%';
};

loadingManager.onLoad = function () {
    const splash = document.getElementById('splash-screen');
    setTimeout(() => {
        splash.style.opacity = '0';
        setTimeout(() => {
            splash.style.display = 'none';
        }, 1000);
    }, 500); // Small delay for smoothness
};

// 2. Pass this manager to your GLTFLoader
const loader = new THREE.GLTFLoader(loadingManager);

// Example loading with manager
loader.load('https://raw.githubusercontent.com/bujjidora0000-lab/Mosalu-Game/main/first%20rabbit%20.glb', (gltf) => {
    scene.add(gltf.scene);
});
