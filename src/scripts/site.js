sculptor.init(document.getElementsByClassName('custom-select'));


function scrollToTitle(event) {
    event.preventDefault();
    var mark = document.querySelector(event.target.getAttribute('href'));
    window.scrollTo(0, mark.offsetTop - 80);
}

var navLinks = document.getElementsByClassName('nav-link');

for (var i = 0; i < navLinks.length; i++) {
    navLinks[i].addEventListener('click', scrollToTitle, false);
}