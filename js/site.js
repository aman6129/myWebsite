// Mohammad Anees
// 6/27/2018

var controls = document.getElementById('controls');
var contentDivs = document.getElementsByClassName('content');
var activeDiv = contentDivs[0];
var divBoundings = createDivBoundings();
var controlsHeight = controls.getBoundingClientRect().height;
var windowHeight = window.innerHeight - controlsHeight;
var ticking = false;

function createDivBoundings(){
    doc = document.getElementsByTagName('html')[0];
    var divBoundings = [];
    var classColorList = {
        'about-container content' : { backgroundColor: '#222222', textColor: 'white' } ,
        'projects-container content' : { backgroundColor: '#FFED00', textColor: '#222222' }
    }
    for(var i = 0; i < contentDivs.length; ++i){
        contentDiv = contentDivs[i];
        var divTopLimit = contentDiv.scrollHeight;
        var divBottomLimit = divTopLimit + window.innerHeight - 50;
        var className = contentDiv.classList.toString();

        divBoundings.push({
            name: className,
            backgroundColor: classColorList[className].backgroundColor,
            textColor: classColorList[className].textColor,
            target: contentDiv,
            scrollHeight: contentDiv.scrollHeight,
            topLimit: divTopLimit,
            bottomLimit: divBottomLimit
        });
    }
    console.log(divBoundings);
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
            activeDiv = currentDiv.target;
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
    throttle("resize", "optimizedResize");
})();

// handle event
window.addEventListener("optimizedResize", function() {
    windowHeight = window.innerHeight - controlsHeight;
    toggleControlsState();
});

var typedTextEl = document.getElementById('typed-text');
var typedTextContent = ['ABCDEFGH', 'CDDGEASSDG', 'ASDASDASDASD'];
var typedTextIndex = 0;
var maxIndex = typedTextContent.length - 1;

function getCurrentTypedText(){
    var typedText = typedTextContent[typedTextIndex];
    if(typedTextIndex < maxIndex) { ++typedTextIndex; }
    else { typedTextIndex = 0 }

    return typedText;
}