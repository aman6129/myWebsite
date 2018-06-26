
var controls = document.getElementById('controls');
// console.log(controls);

controls.addEventListener('click', function(e) {
    console.log(controls.getBoundingClientRect());
    var yPosition = controls.getBoundingClientRect().y;
    if(yPosition <= 0){
        controls.classList.remove('absolute');
        controls.classList.add('fixed');
    }
    else{
        controls.classList.add('absolute');
        controls.classList.remove('fixed');
    }
    
  }, false);