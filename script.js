// Așteaptă ca tot conținutul paginii să fie încărcat

    document.addEventListener('DOMContentLoaded', () => {

    const meniuMobil = document.getElementById('meniu-mobil');
    if (meniuMobil) {
        meniuMobil.addEventListener('change', (event) => {
            const valoareSelectata = event.target.value;
            if (valoareSelectata) {
                window.location.href = valoareSelectata;
            }
        });
    }

    // --- LOGICA PENTRU GALERIA CU FILTRE (rulează doar pe pagina galerie.html) ---
    const butoaneFiltru = document.querySelectorAll('.filtru-btn');
    const itemeGalerieFiltru = document.querySelectorAll('.galerie-container .galerie-item');
    if (butoaneFiltru.length > 0 && itemeGalerieFiltru.length > 0) {
        itemeGalerieFiltru.forEach(item => item.classList.add('show'));
        butoaneFiltru.forEach(buton => {
            buton.addEventListener('click', () => {
                butoaneFiltru.forEach(btn => btn.classList.remove('activ'));
                buton.classList.add('activ');
                const filtru = buton.getAttribute('data-filtru');
                itemeGalerieFiltru.forEach(item => {
                    item.classList.remove('show');
                    if (filtru === 'toate' || item.getAttribute('data-categorie') === filtru) {
                        item.classList.add('show');
                    }
                });
            });
        });
    }

    // --- LOGICA PENTRU SLIDER-UL FOTO DINAMIC (rulează doar pe pagina evenimente.html) ---
    const sliderContainer = document.querySelector('.slider-container');
    if (sliderContainer) {
        const sursaImagini = document.querySelectorAll('#sursa-imagini-slider img');
        const imaginiSlider = Array.from(sursaImagini).map(img => img.src);
    
        if (imaginiSlider.length > 0) {
            let currentIndex = 0;
            const sliderImage = document.getElementById('slider-image');
            const prevBtn = document.getElementById('prev-btn');
            const nextBtn = document.getElementById('next-btn');
            const sliderCounter = document.getElementById('slider-counter');
    
            function afiseazaImagine(index) {
                if(sliderImage) sliderImage.src = imaginiSlider[index];
                if(sliderCounter) sliderCounter.textContent = `${index + 1} / ${imaginiSlider.length}`;
            }
    
            if(nextBtn) {
                nextBtn.addEventListener('click', () => {
                    currentIndex = (currentIndex + 1) % imaginiSlider.length;
                    afiseazaImagine(currentIndex);
                });
            }
    
            if(prevBtn) {
                prevBtn.addEventListener('click', () => {
                    currentIndex = (currentIndex - 1 + imaginiSlider.length) % imaginiSlider.length;
                    afiseazaImagine(currentIndex);
                });
            }
    
            afiseazaImagine(0);
        }
    }

    // --- LOGICA PENTRU A ACTIVA LIGHTBOX-UL (UNIVERSAL) ---
    const triggeriLightbox = document.querySelectorAll('.galerie-item, .award-card img, .premiu-img, .galerie-img, .clickable, .content-image img');
    triggeriLightbox.forEach(trigger => {
        if (trigger.querySelector('img') || trigger.tagName === 'IMG') {
            trigger.style.cursor = 'pointer';
        }
        trigger.addEventListener('click', function(event) {
            event.stopPropagation();
            const elementDeAfisat = this.querySelector('img') || this;
            openLightbox(elementDeAfisat);
        });
    });

});

// --- FUNCȚIILE LIGHTBOX (Globale) ---
const lightbox = document.getElementById("lightbox");
const lightboxContainer = document.getElementById("lightbox-content-container");

function openLightbox(element) {
    if (!lightbox || !lightboxContainer) return;
    const videoSrc = element.getAttribute('data-video-src');
    lightboxContainer.innerHTML = "";
    if (videoSrc) {
        const videoPlayer = document.createElement('video');
        videoPlayer.src = videoSrc;
        videoPlayer.controls = true;
        videoPlayer.autoplay = true;
        videoPlayer.loop = true;
        videoPlayer.classList.add('lightbox-content');
        lightboxContainer.appendChild(videoPlayer);
    } else {
        const imageViewer = document.createElement('img');
        imageViewer.src = element.src;
        imageViewer.classList.add('lightbox-content');
        lightboxContainer.appendChild(imageViewer);
    }
    lightbox.style.display = "flex";
}

function closeLightbox() {
    if (!lightbox || !lightboxContainer) return;
    const video = lightboxContainer.querySelector('video');
    if (video) { video.pause(); }
    lightbox.style.display = "none";
}

if (lightbox) {
    const closeBtn = lightbox.querySelector('.close');
    if(closeBtn) {
      closeBtn.addEventListener('click', closeLightbox);
    }
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) { closeLightbox(); }
    });
}