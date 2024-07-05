document.addEventListener('DOMContentLoaded', function() {
    const testimonials = document.querySelectorAll('.testimonial');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    let currentIndex = 0;

    function updateSlider() {
        testimonials.forEach((testimonial, index) => {
            testimonial.style.transform = `translateX(-${currentIndex * 100}%)`;
        });

        prevButton.disabled = currentIndex === 0;
        nextButton.disabled = currentIndex === testimonials.length - 1;
    }

    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentIndex < testimonials.length - 1) {
            currentIndex++;
            updateSlider();
        }
    });

    updateSlider();
});
