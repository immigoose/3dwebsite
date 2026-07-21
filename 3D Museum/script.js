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
const modelDescription = document.getElementById('model-description');

// Define your models here - add more as needed
const models = [
  { 
    src: 'Columbina.glb', 
    poster: 'poster.webp', 
    name: 'Columbina',
    description: '<h3>Columbina</h3><p>Columbina is a stock character in the Commedia dell\'arte. She is usually depicted as a clever and witty servant girl, often involved in intrigues and love affairs.</p>'
  },
  { 
    src: 'ganymed.glb', 
    poster: 'poster.webp', 
    name: 'Ganymed',
    description: '<h3>Ganymed</h3><p>In Greek mythology, Ganymede was a beautiful Trojan prince who was abducted by Zeus to serve as cupbearer to the gods on Mount Olympus.</p>'
  },
];

let currentModelIndex = 0;

// Save initial camera orbit for consistent framing
let savedCameraOrbit = null;

// Function to show model description
function showModelDescription() {
  const model = models[currentModelIndex];
  modelDescription.innerHTML = `
    <button class="close-btn" id="close-description">&times;</button>
    ${model.description}
  `;
  modelDescription.classList.add('show');
}

// Function to hide model description
function hideModelDescription() {
  modelDescription.classList.remove('show');
}

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
  hideModelDescription();

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

// Toggle description when clicking the INFO button
document.getElementById('info-button').addEventListener('click', (e) => {
  e.stopPropagation();
  if (modelDescription.classList.contains('show')) {
    hideModelDescription();
  } else {
    showModelDescription();
  }
});

// Close description when clicking the close button
modelDescription.addEventListener('click', (e) => {
  if (e.target.id === 'close-description') {
    hideModelDescription();
  }
});

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