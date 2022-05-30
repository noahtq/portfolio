
function popoutOn(event) {
    let popoutNode = event.target.parentNode.parentNode.children[1];
    popoutNode.style.opacity = '1';
}

function popoutOff(event) {
    let popoutNode = event.target.parentNode.parentNode.children[1];
    popoutNode.style.opacity = '';
}

const containers = document.querySelectorAll('.popout-container');
const logos = document.querySelectorAll('.popout-container img');
logos.forEach(logo => {
    logo.addEventListener('mouseover', popoutOn);
    logo.addEventListener('mouseout', popoutOff);
})
