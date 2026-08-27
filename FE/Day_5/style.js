const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    
    if (window.scrollY > 100) {
        header.classList.add('shrink1');
        header.classList.remove('shrink');
    } else if (window.scrollY > 100) {
        header.classList.add('shrink');
        header.classList.remove('shrink1');
    } else {
        header.classList.remove('shrink1', 'shrink');
    }
});