// Mohammad Anees
// 6/27/2018
// scripts for project images/texts

var projectImageEl = document.getElementById('computer-screen');
var projectNameEl = document.getElementById('project-name');
var projectBuiltWithTextEl = document.getElementById('built-with');
var projectPurposeTextEl = document.getElementById('purpose-text');

var projectContents = [
    { 
        name: 'mohammadanees.com', 
        siteUrl: 'http://mohammadanees.com',
        imageUrl: 'mywebsite.png',
        aboutText: 'Just a personal website.',
        builtWithText: 'Made with HTML, CSS, and Javascript.' 
    },
    { 
        name: 'katfacts', 
        siteUrl: 'http://katfacts.herokuapp.com',
        imageUrl: 'katfacts.png', 
        aboutText: 'C', 
        builtWithText: 'D' 
    }
];
var currentProjectIndex = 0;
var projectContentsLength = projectContents.length;

function getProject(projOffset){
    currentProjectIndex += projOffset;
    if(currentProjectIndex >= projectContentsLength) currentProjectIndex = 0;
    if(currentProjectIndex < 0) currentProjectIndex = projectContentsLength - 1;
    return projectContents[currentProjectIndex];
}

function getNextProject(){
    return getProject(1);
}

function getPreviousProject(){
    return getProject(-1);
}

function fadeProjectContentOut(){
    projectImageEl.style.opacity = 0;
    projectBuiltWithTextEl.style.opacity = 0;
    projectPurposeTextEl.style.opacity = 0;
    projectNameEl.style.opacity = 0;
}

function fadeProjectContentIn(content){
    window.setTimeout(function(){
        projectImageEl.src = 'assets/' + content.imageUrl;
        projectBuiltWithTextEl.innerText = content.builtWithText;
        projectPurposeTextEl.innerText = content.aboutText;
        projectNameEl.innerText = content.name;
        
        projectImageEl.style.opacity = 1;
        projectBuiltWithTextEl.style.opacity = 1;
        projectPurposeTextEl.style.opacity = 1;
        projectNameEl.style.opacity = 1;
    }, 250);
}

function nextProject(){
    var projectToDisplay = getPreviousProject();
    console.log(projectToDisplay);
    fadeProjectContentOut();
    fadeProjectContentIn(projectToDisplay);
}

function routeToProject(){
    var currentProject = getProject(0);
    window.open(currentProject.siteUrl, '_blank');
}

