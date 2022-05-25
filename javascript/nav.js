function hoverNavMove(event) {
    event.target.style.bottom = '2px';
}

function hoverNavDefault(event) {
    event.target.style.bottom = '';
}

document.querySelectorAll('.page').forEach(element => {
    element.addEventListener('mouseover', hoverNavMove);
    element.addEventListener('mouseout', hoverNavDefault);
})
