// Mohammad Anees
// 6/27/2018

var controls = document.getElementById('controls');
var controlsHeight = controls.getBoundingClientRect().height;
var windowHeight = window.innerHeight - controlsHeight;
var ticking = false;

function toggleControlsState(){
    var yPosition = window.scrollY;
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

window.addEventListener('scroll', function(e) {
    if (!ticking) {
        window.requestAnimationFrame(function() {
          toggleControlsState();
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