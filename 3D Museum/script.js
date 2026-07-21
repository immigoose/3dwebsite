// Handles loading animation
const loadingAnimation = document.getElementById('loading-animation');

const onProgress = (event) => {
  if (event.detail.totalProgress === 1) {
    loadingAnimation.classList.remove('show');
    event.target.removeEventListener('progress', onProgress);
  }
};
document.querySelector('model-viewer').addEventListener('progress', onProgress);

// Model switching functionality
const modelViewer = document.getElementById('model-viewer');
const modelInfo = document.getElementById('model-info');

// Define your models here - add more as needed
const models = [
  { src: 'Columbina.glb', poster: 'poster.webp', name: 'Columbina' },
  { src: 'ganymed/ganymed.glb', poster: 'poster.webp', name: 'Ganymed' },
];

let currentModelIndex = 0;

// Save initial camera orbit for consistent framing
let savedCameraOrbit = null;

// Function to load a model
function loadModel(index) {
  const model = models[index];
  
  // Save current camera orbit before changing model (only first time)
  if (savedCameraOrbit === null && modelViewer.cameraOrbit) {
    savedCameraOrbit = modelViewer.cameraOrbit;
  }
  
  loadingAnimation.classList.add('show');
  modelViewer.src = model.src;
  modelViewer.poster = model.poster;
  modelInfo.textContent = model.name;

  // Re-add progress listener for new model
  modelViewer.addEventListener('progress', onProgress);
  
  // Restore camera orbit after model loads
  const restoreCamera = () => {
    if (savedCameraOrbit) {
      modelViewer.cameraOrbit = savedCameraOrbit;
    }
  };
  modelViewer.addEventListener('load', restoreCamera, { once: true });
}

// Initialize
loadModel(currentModelIndex);

// Next model button
document.getElementById('next-model').addEventListener('click', () => {
  currentModelIndex = (currentModelIndex + 1) % models.length;
  loadModel(currentModelIndex);
});

// Previous model button
document.getElementById('prev-model').addEventListener('click', () => {
  currentModelIndex = (currentModelIndex - 1 + models.length) % models.length;
  loadModel(currentModelIndex);
});

// Keyboard navigation (optional)
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') {
    currentModelIndex = (currentModelIndex + 1) % models.length;
    loadModel(currentModelIndex);
  } else if (e.key === 'ArrowLeft') {
    currentModelIndex = (currentModelIndex - 1 + models.length) % models.length;
    loadModel(currentModelIndex);
  }
});