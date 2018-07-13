// Mohammad Anees
// 7/4/2018
// script for typewriter effect

var typedTextEl = document.getElementById('typed-text');
var typedStingsList = [
    'AngularJS', 'Angular 2+', 'HTML', 'Python', 'CSS/LESS/SASS',
    'batman.js', 'Ruby on Rails', 'Javascript' ,'Typescript', 'CoffeeScript',
    'C# and .NET', 'Pivotal Cloud Foundry', 'AWS', 'JQuery', 'Sketch', 'Photoshop', 'TFS', 'git', 'SVN'
];
var currentString = '';
var stringIndex = 0;
var maxIndex = typedStingsList.length - 1;

var typingForward = true;
var finishedTypingWord = false;
var typedTextLength = 0;
var typedTextIndex = 0;

var typeInterval = 200;
var deleteInterval = 70;
var pauseInterval = 2000;

function getCurrentStringToType(){
    var typedText = typedStingsList[stringIndex];
    if(stringIndex < maxIndex) { ++stringIndex; }
    else { stringIndex = 0 }

    return typedText;
}

function getTypedString(){
    if(typingForward === true && typedTextIndex === 0){
        currentString = getCurrentStringToType();
        typedTextLength = currentString.length;
    }
    var typedString = '';
    if(typingForward === true && typedTextIndex <= typedTextLength){
        typedString = currentString.slice(0, typedTextIndex);
        typedTextIndex++;
    }
    if(typingForward === false && typedTextIndex >= 0){
        typedString = currentString.slice(0, typedTextIndex);
        typedTextIndex--;
    }
    if(typedTextIndex <= 0) typingForward = true;
    if(typedTextIndex > typedTextLength){
        typingForward = false;
        finishedTypingWord = true;
    };

    return typedString;
}

function getCurrentInterval(){
    var randomSpeedModifier = Math.ceil(30 * Math.random(1, 10));

    if(finishedTypingWord){
        finishedTypingWord = false;
        return pauseInterval;
    };
    if(typingForward === false) return deleteInterval + randomSpeedModifier;
    
    return typeInterval + randomSpeedModifier;
}

window.addEventListener('load', function(){
    typedTextEl.innerText = '';

    var startTypingText = function(){
        typedTextEl.innerText = getTypedString();
        var interval = getCurrentInterval();
        setTimeout(startTypingText, interval);
    }

    setTimeout(startTypingText, typeInterval);
}, false)