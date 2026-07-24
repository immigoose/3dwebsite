//loding animation
const loadingAnimation = document.getElementById('loading-animation');

const onProgress = (event) => {
  if (event.detail.totalProgress === 1) {
    loadingAnimation.classList.remove('show');
    event.target.removeEventListener('progress', onProgress);
  }
};
document.querySelector('model-viewer').addEventListener('progress', onProgress);

// Gallery menu 
const galleryButton = document.getElementById('gallery-button');
const galleryMenu = document.getElementById('gallery-menu');
const galleryMenuClose = document.getElementById('gallery-menu-close');
const galleryMenuItems = document.getElementById('gallery-menu-items');

//toggle menu
function toggleMenu() {
  const isMenuOpen = galleryMenu.classList.toggle('show');
  galleryButton.style.display = isMenuOpen ? 'none' : 'block';
}

//populate menu items
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

//update active menu item
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

//listeners for menu
galleryButton.addEventListener('click', toggleMenu);
galleryMenuClose.addEventListener('click', toggleMenu);

// Abstract modal functionality
const abstractButton = document.getElementById('abstract-button');
const abstractModal = document.getElementById('abstract-modal');
const closeAbstract = document.getElementById('close-abstract');

function showAbstract() {
  abstractModal.classList.add('show');
}

function hideAbstract() {
  abstractModal.classList.remove('show');
}

abstractButton.addEventListener('click', showAbstract);
closeAbstract.addEventListener('click', hideAbstract);

// Close abstract modal when clicking outside
abstractModal.addEventListener('click', (e) => {
  if (e.target === abstractModal) {
    hideAbstract();
  }
});

// Video modal functionality
const videoButton = document.getElementById('video-button');
const videoModal = document.getElementById('video-modal');
const closeVideo = document.getElementById('close-video');
const mobileVideo = document.getElementById('mobile-video');

function showVideo() {
  videoModal.classList.add('show');
  mobileVideo.currentTime = 0;
  mobileVideo.play().catch(error => {
    console.error("Video could not be played:", error);
  });
}

function hideVideo() {
  videoModal.classList.remove('show');
  mobileVideo.pause();
}

videoButton.addEventListener('click', showVideo);
closeVideo.addEventListener('click', hideVideo);

// Close video modal when clicking outside
videoModal.addEventListener('click', (e) => {
  if (e.target === videoModal) {
    hideVideo();
  }
});

// Model switching functionality
const modelViewer = document.getElementById('model-viewer');
const modelInfo = document.getElementById('model-info');
const modelDescription = document.getElementById('model-description');
const transitionAnimation = document.getElementById('transition-animation');


const models = [
  { 
    src: 'venus.glb', 
    poster: 'venus.webp', 
    name: '1. Venus of Willendorf',
    description: '<h3>Venus of Willendorf<p id="year">~30,000 BP</p></h3> <p>Venus of Willendorf, also simply called the "Woman of Willendorf", due to the goddess Venus not having yet been worshipped, is a small sculpture depicting a female body. Some interprete the figure to be a deity of fertility, while others believe she might have been a sort of self portrait.</p>',
  },
    { 
    src: 'sekhmet.glb', 
    poster: 'sekhmet.webp', 
    name: '2. Sekhmet',
    description: '<h3>Sekhmet<p id="year">~1500 BC, Egypt</p></h3><p>Sekhmet is a goddess in ancient Egyptian religion, often depicted as a lioness or woman with a lioness head, symbolizing both desctruction and healing and is, as the daughter of the sun god Ra, one of the more important deities. This depiction shows her standing with a papyrus-staff, the base and arms missing or damaged. </p>'
  },
   { 
    src: 'aphrodite of milos.glb', 
    poster: 'poster.webp', 
    name: '3. Aphrodite of Milos',
    description: '<h3>Aphrodite of Milos<p id="year">~140 BC, Greece</p></h3><p>The Aphrodite of Milos, also known as the Venus de Milo, is a famous ancient Greek statue depicting the goddess Aphrodite. It is one of the most famous and influential depictions of the personification of love and beauty, serving as a beauty standard and beacon of antiquity.</p>'
  },
  { 
    src: 'nike.glb', 
    poster: 'poster.webp', 
    name: '4. Nike',
    description: '<h3>Nike<p id="year">~300 BC, Greece</p></h3><p>Nike is a Greek goddess of victory, often depicted as a winged figure. The fractured statue is missing both the arms and head, just leaving a figure hugging dress to highlight the body shape as well as the opulent, detailed wings in a landing position, bracing the incoming wind.</p>'
  },
  { 
    src: 'guanyin.glb', 
    poster: 'guanyin.webp', 
    name: '5. Guanyin',
    description: '<h3>Guanyin<p id="year">1100–1200, China</p></h3><p>The bodhisattva is an enlightened being dedicated to the spiritual awakening of all beings. The compassionate bodhisattva Guanyin, in a variety of manifestations, is probably the most popular deity of worship in Chinese Buddhism. The deity originated as the male bodhisattva Avalokitesvara in India but gradually transitioned into a predominantly female figure (or goddess of mercy) in East Asia over hundreds of years.</p>'
  },
  { 
    src: 'madonna.glb', 
    poster: 'madonna.webp', 
    name: '6. Madonna z Krużlowej',
    description: '<h3> Madonna z Krużlowej (Madonna of Krużlowej)<p id="year">~1410, Poland</p></h3> <p>Madonna z Krużlowej is a Gothic sculpture of the Virgin Mary. The Madonna is the most depicted woman in Western art, here seen with Christ resting on her hip, depicting a woman as a mother and a symbol of power, due to the crown gracing her head, symbolizing her status as the mother of Jesus.</p>'  
  },
   { 
    src: 'queen victoria.glb', 
    poster: 'queen_victoria.webp', 
    name: '7. Queen Victoria',
    description: '<h3>Queen Victoria<p id="year">1888, United Kingdom</p></h3><p>Queen Victoria was the monarch of the United Kingdom from 1837 to 1901. Being and influential figure of the victorian era, she pioneered many fashion trends for women of the time.</p>'
  },
   { 
    src: 'La Baigneuse drapée.glb', 
    poster: 'poster.webp', 
    name: '8. La Baigneuse drapée',
    description: '<h3>La Baigneuse drapée<p id="year">1937, France</p></h3><p>La Baigneuse drapée is a famous sculpture by Aristide Maillol, depicting a woman bathing with a cloth hanging. While the body is partially covered, most of her figure is clearly visible, created in an impressionistic style.</p>'
  },
   { 
    src: 'lara croft.glb', 
    poster: 'poster.webp', 
    name: '9. Lara Croft',
    description: '<h3>Lara Croft<p id="year">1996</p></h3><p>Lara Croft is a fictional character and the protagonist of the Tomb Raider video game series. Know for her iconic low poly look, the game is unique for featuring a female protagonist. The big game levels and for its time cutting edge technology pushed the console capacities to its limits. </p>'
  },
  { 
    src: 'Columbina.glb', 
    poster: 'poster.webp', 
    name: '10. Columbina',
    description: '<h3>Columbina<p id="year">2025</p></h3><p>Columbina is a character from the gacha video game "Genshin Impact". As a moon goddess her design features a elegant and graceful appearance, depicted with a flowing dress with many moon symbols and a gentle expression. Being released just last year, the 3D model shows a high level of detail</p>'
  },
];

let currentModelIndex = 0;

let savedCameraOrbit = null;

//show model description
function showModelDescription() {
  const model = models[currentModelIndex];
  modelDescription.innerHTML = `
    <button class="close-btn" id="close-description">&times;</button>
    ${model.description}
  `;
  modelDescription.classList.add('show');
}

//hide model description
function hideModelDescription() {
  modelDescription.classList.remove('show');
}

// load a model
function loadModel(index) {
  const model = models[index];
  
  // Save current camera orbit before changing model
  if (savedCameraOrbit === null && modelViewer.cameraOrbit) {
    savedCameraOrbit = modelViewer.cameraOrbit;
  }
  
  modelViewer.src = model.src;
  modelViewer.poster = model.poster;
  modelInfo.textContent = model.name;
  hideModelDescription();
  updateActiveMenuItem();

  // transition animation for 2.5 seconds
  transitionAnimation.classList.add('show');
  setTimeout(() => {
    transitionAnimation.classList.remove('show');
  }, 2500);


  modelViewer.addEventListener('progress', onProgress);
  

  const restoreCamera = () => {
    if (savedCameraOrbit) {
      modelViewer.cameraOrbit = savedCameraOrbit;
    }
  };
  modelViewer.addEventListener('load', restoreCamera, { once: true });
}


loadModel(currentModelIndex);
populateMenuItems();

//  INFO button
document.getElementById('info-button').addEventListener('click', (e) => {
  e.stopPropagation();
  if (modelDescription.classList.contains('show')) {
    hideModelDescription();
  } else {
    showModelDescription();
  }
});

// Close description 
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

// Keyboard navigation 
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') {
    currentModelIndex = (currentModelIndex + 1) % models.length;
    loadModel(currentModelIndex);
  } else if (e.key === 'ArrowLeft') {
    currentModelIndex = (currentModelIndex - 1 + models.length) % models.length;
    loadModel(currentModelIndex);
  }
});