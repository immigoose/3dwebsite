const wooshSound = new Audio("footsteps.mp3");

const prevButton = document.getElementById("prev-model");
const nextButton = document.getElementById("next-model");

function playWooshSound() {
    wooshSound.currentTime = 0;
    wooshSound.play().catch(error => {
        console.error("The sound could not be played:", error);
    });
}

prevButton.addEventListener("click", playWooshSound);
nextButton.addEventListener("click", playWooshSound);

