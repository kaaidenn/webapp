const modal = document.getElementById("modal");
const modalImage = document.getElementById("modal-image");
const closeBtn = document.querySelector(".close");
const images = document.querySelectorAll(".masonry-content");

// Abre el modal con la imagen seleccionada
images.forEach(image => {
    image.addEventListener("click", () => {
        modal.style.display = "flex";
        modalImage.src = image.src;
    });
});

// Cierra el modal
closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

// Cierra el modal al hacer clic fuera de la imagen
modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});