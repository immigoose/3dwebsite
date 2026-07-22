// Handles loading animation
const loadingAnimation = document.getElementById('loading-animation');

const onProgress = (event) => {
  if (event.detail.totalProgress === 1) {
    loadingAnimation.classList.remove('show');
    event.target.removeEventListener('progress', onProgress);
  }
};
document.querySelector('model-viewer').addEventListener('progress', onProgress);

// Gallery menu functionality
const galleryButton = document.getElementById('gallery-button');
const galleryMenu = document.getElementById('gallery-menu');
const galleryMenuClose = document.getElementById('gallery-menu-close');
const galleryMenuItems = document.getElementById('gallery-menu-items');

// Function to toggle menu
function toggleMenu() {
  const isMenuOpen = galleryMenu.classList.toggle('show');
  galleryButton.style.display = isMenuOpen ? 'none' : 'block';
}

// Function to populate menu items
function populateMenuItems() {
  galleryMenuItems.innerHTML = '';
  models.forEach((model, index) => {
    const item = document.createElement('div');
    item.className = 'gallery-menu-item';
    if (index === currentModelIndex) {
      item.classList.add('active');
    }
    item.textContent = model.name;
    item.addEventListener('click', () => {
      currentModelIndex = index;
      loadModel(currentModelIndex);
      toggleMenu();
      updateActiveMenuItem();
    });
    galleryMenuItems.appendChild(item);
  });
}

// Function to update active menu item
function updateActiveMenuItem() {
  const items = galleryMenuItems.querySelectorAll('.gallery-menu-item');
  items.forEach((item, index) => {
    if (index === currentModelIndex) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
}

// Event listeners for menu
galleryButton.addEventListener('click', toggleMenu);
galleryMenuClose.addEventListener('click', toggleMenu);

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
  { 
    src: 'venus.glb', 
    poster: 'venus.webp', 
    name: 'Venus von Willendorf',
    description: '<h3>Venus von Willendorf</h3><p>Venus von Willendorf is a historical figure known for her role in the Renaissance period.</p>'
  },
  { 
    src: 'madonna.glb', 
    poster: 'madonna.webp', 
    name: 'Madonna',
    description: '<h3>Madonna</h3><p>The Madonna is a common subject in Christian art, typically depicting the Virgin Mary with the Christ Child.</p>'
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
  updateActiveMenuItem();

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
populateMenuItems();

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