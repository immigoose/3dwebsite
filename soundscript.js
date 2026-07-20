



const image = document.getElementById("shrek-image");
const sound = new Audio("./media/3. Babos Party Pt. 2.mp3");

image.addEventListener("click", () => {
    sound.currentTime = 0;
    sound.play().catch(error => {
        console.error("The sound could not be played:", error);
    });
});

