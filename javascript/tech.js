
const icons = document.querySelectorAll('#tech .icon img');
const overlays = document.querySelectorAll('.info-overlay');

function iconOverlayOn(event) {
    //lower non-target icons opacities
    icons.forEach(element => {
        element.style.opacity = '0.25';
    })
    event.target.style.opacity = '1';
    
    //turn on overlay
    overlayNode = event.target.parentElement.children[0];
    overlayNode.style.opacity = '1';
}

function iconOverlayOff(event) {
    //set icon opacities back to default
    icons.forEach(element => {
        element.style.opacity = '';
    })
    
    //turn off overlay
    overlayNode = event.target.parentElement.children[0];
    overlayNode.style.opacity = '';
}


icons.forEach(element => {
    element.addEventListener('mouseover', iconOverlayOn);
    element.addEventListener('mouseout', iconOverlayOff);
});

