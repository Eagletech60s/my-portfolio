document.addEventListener('DOMContentLoaded', (event) => {
    const toggleButton = document.getElementById('nav-toggle');
    const navbar = document.querySelector('.navbar');

    toggleButton.addEventListener('click', () => {
        navbar.classList.toggle('active');
    });
});
