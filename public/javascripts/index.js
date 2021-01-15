
(function () {
    const kof = document.querySelectorAll('li.kind_of_food');

    kof.forEach(e => {
        e.addEventListener('mouseover', (event) => {
            event.preventDefault();
            e.classList.add('visible');
        });

        e.addEventListener('mouseleave', (event) => {
            event.preventDefault();
            e.classList.remove('visible');
        });
    });
})();