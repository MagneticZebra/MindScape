const quote = "\"The root of your problem is a lack of knowledge\" - Robert";
const quoteElement = document.getElementById('introQuote');
const contentElement = document.getElementById('content');

let index = 0;

document.addEventListener('DOMContentLoaded', function() {
    typeQuote();
});

// Type out the quote letter by letter
function typeQuote() {
    if (index < quote.length) {
        quoteElement.textContent += quote[index];
        index++;
        setTimeout(typeQuote, 60);
    } else {
        // After typing the entire quote, delay, then fade out the quote
        setTimeout(() => {
            quoteElement.style.opacity = '0';

            // After the quote has faded out, fade in the main content
            setTimeout(() => {
                contentElement.style.opacity = '1';
            }, 1000); // Delay corresponds to the opacity transition of the quote
        }, 1000); // Adjust this delay to keep the quote visible longer (3000ms = 3s)
    }
}

function toggleMenu() {
    var menu = document.getElementById('nav-menu');
    var content = document.getElementById('main-content');
    var menuIcon = document.getElementsByClassName('menu-icon')[0]; // Get the menu icon element

    if (menu.style.left === '0px') {
        menu.style.left = '-250px';
        content.style.marginLeft = '0';
        menuIcon.classList.remove('hidden-icon'); // Show the menu icon smoothly
    } else {
        menu.style.left = '0px';
        content.style.marginLeft = '250px';
        menuIcon.classList.add('hidden-icon'); // Hide the menu icon smoothly
    }
}   

function closeMenu() {
    var menu = document.getElementById('nav-menu');
    var content = document.getElementById('main-content');

    menu.style.left = '-250px';
    content.style.marginLeft = '0';
}