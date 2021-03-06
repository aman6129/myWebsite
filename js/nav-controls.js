// Mohammad Anees
// 6/27/2018
// script to handle controls transitions and position

var controls = document.getElementById('controls');
var contentDivs = document.getElementsByClassName('content');
var activeDiv = contentDivs[0];
var activeControlButton = document.getElementById('about-btn');
var divBoundings = createDivBoundings();
var controlsHeight = controls.getBoundingClientRect().height;
var windowHeight = window.innerHeight - controlsHeight;
var ticking = false;

function reInitWindowRelativeVariables(){
    activeControlButton.classList.add('active');
    windowHeight = window.innerHeight - controlsHeight;
    divBoundings = createDivBoundings();
    toggleControlsState();
    adjustControlsColors();
}

window.addEventListener('load', function(){
    reInitWindowRelativeVariables();
})

function createDivBoundings(){
    var windowHeight = window.innerHeight - controls.getBoundingClientRect().height;
    var divBoundings = [];
    var classColorList = {
        'about-container content' : { backgroundColor: '#222222', textColor: 'white', controlId: 'about-btn' } ,
        'projects-container content' : { backgroundColor: '#FFED00', textColor: '#222222', controlId: 'projects-btn' },
        'experience-container content' : { backgroundColor: '#1336E4', textColor: 'white', controlId: 'experience-btn' },
        'contact-container content' : { backgroundColor: '#FFAAAE', textColor: '#222222', controlId: 'contact-btn' }
    }
    for(var i = 0; i < contentDivs.length; ++i){
        contentDiv = contentDivs[i];
        var divTopLimit = windowHeight;
        if(divBoundings[i-1] !== undefined) divTopLimit = divBoundings[i-1].bottomLimit;
        var divBottomLimit = divTopLimit + contentDiv.getBoundingClientRect().height;
        var className = contentDiv.classList.toString();

        divBoundings.push({
            name: className,
            backgroundColor: classColorList[className].backgroundColor,
            textColor: classColorList[className].textColor,
            controlId: classColorList[className].controlId,
            target: contentDiv,
            topLimit: divTopLimit,
            bottomLimit: divBottomLimit
        });
    }
    return divBoundings;
}

function getCurrentDiv(yPos){
    var currentDiv = divBoundings.filter(function(bounding){
        return bounding.topLimit <= yPos && bounding.bottomLimit > yPos;
    })[0];

    return currentDiv;
}

function toggleControlsState(){
    var yPosition = window.pageYOffset;
    var isLocked = (windowHeight - yPosition) <= 0 ? true : false;
    var classList = controls.classList.value.split(' ');
    var isStateAbsolute = classList.indexOf('absolute') !== -1 ? true : false;
    var isStateFixed = classList.indexOf('fixed') !== -1 ? true : false;

    if(isLocked && isStateAbsolute){
        controls.classList.remove('absolute');
        controls.classList.add('fixed');
    }
    else if(!isLocked && isStateFixed){
        controls.classList.add('absolute');
        controls.classList.remove('fixed');
    }
}

function adjustControlsColors(){
    var currentDiv = getCurrentDiv(window.pageYOffset);
    if(currentDiv !== undefined){
        if(currentDiv.name !== activeDiv.classList.toString()){
            divBackgroundColor = currentDiv.backgroundColor;
            divTextColor = currentDiv.textColor;

            controls.style.backgroundColor = divBackgroundColor;
            controls.style.color = divTextColor;

            var newControlButton = document.getElementById(currentDiv.controlId);
            newControlButton.classList.add('active');
            activeControlButton.classList.remove('active');

            activeDiv = currentDiv.target;
            activeControlButton = newControlButton
        }
    }
}

window.addEventListener('scroll', function(e) {
    if (!ticking) {
        window.requestAnimationFrame(function() {
          toggleControlsState();
          adjustControlsColors();
          ticking = false;
        });
         
        ticking = true;
    }
}, false);


// handle window resize for controls container efficiently
(function() {
    var throttle = function(type, name, obj) {
        obj = obj || window;
        var running = false;
        var func = function() {
            if (running) { return; }
            running = true;
             requestAnimationFrame(function() {
                obj.dispatchEvent(new CustomEvent(name));
                running = false;
            });
        };
        obj.addEventListener(type, func);
    };

    /* init - you can init any event */
    throttle('resize', 'optimizedResize');
})();

// handle event
window.addEventListener('optimizedResize', function() {
    reInitWindowRelativeVariables();
});

function scrollToDiv(scrollIndex){
    var divBounds = divBoundings[scrollIndex];
    if(divBounds !== undefined){
        window.scrollTo(0, divBounds.topLimit);
    }
}

