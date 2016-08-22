var languages = [
    "Javascript",
    "Ruby on Rails",
    "CoffeeScript",
    "HTML",
    "CSS/Less/Sass",
    "C/C++",
    ".NET",
    "Java",
    "AngularJS",
    "Nodejs"
]

$(document).ready(function(){
    $('#lang').typed({
        strings: languages,
        typeSpeed: 90,
        backSpeed: 60,
        backDelay: 1500,
        loop: true
    });
});
