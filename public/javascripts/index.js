
(function () {

    const imgs = document.querySelectorAll('ul.grid li');
    let tc = 0;

    imgs.forEach(e => {
        setTimeout(() => {
            e.classList.add('visible');
        }, tc += 100);
    });
    imgs.forEach(target => {
        const mask = target.childNodes[1];
        target.addEventListener('mouseover', (event) => {
            event.preventDefault();
            mask.classList.add('visible');
        });
        target.addEventListener('mouseleave', (event) => {
            event.preventDefault();
            mask.classList.remove('visible');
        });
    });

})();