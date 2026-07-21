// Wait for model-viewer to be ready
const modelViewer = document.getElementById('model-viewer');
const modelInfo = document.getElementById('model-info');
const loadingAnimation = document.getElementById('loading-animation');

// Define your models here - add more as needed
const models = [
  { src: 'Columbina.glb', poster: 'poster.webp', name: 'Columbina' },
  { src: 'ganymed/ganymed.glb', poster: 'poster.webp', name: 'Ganymed' },
];

let currentModelIndex = 0;

const onProgress = (event) => {
  if (event.detail.totalProgress === 1) {
    loadingAnimation.classList.remove('show');
    event.target.removeEventListener('progress', onProgress);
  }
};

// Function to load a model
function loadModel(index) {
  const model = models[index];
  loadingAnimation.classList.add('show');
  modelViewer.src = model.src;
  modelViewer.poster = model.poster;
  modelInfo.textContent = model.name;
  modelViewer.addEventListener('progress', onProgress);
}

// Initialize once model-viewer is ready
function initialize() {
  if (customElements.get('model-viewer')) {
    loadModel(currentModelIndex);
  } else {
    customElements.whenDefined('model-viewer').then(initialize);
  }
}
initialize();

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