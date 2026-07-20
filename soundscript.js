



const image = document.getElementById("shrek-image");
const sound = new Audio("./material/sound.mp3");

image.addEventListener("click", () => {
    sound.currentTime = 0;
    sound.play().catch(error => {
        console.error("The sound could not be played:", error);
    });
});

