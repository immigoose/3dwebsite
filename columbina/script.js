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

// Function to load a model
function loadModel(index) {
  const model = models[index];
  loadingAnimation.classList.add('show');
  modelViewer.src = model.src;
  modelViewer.poster = model.poster;
  modelInfo.textContent = model.name;

  // Re-add progress listener for new model
  modelViewer.addEventListener('progress', onProgress);
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