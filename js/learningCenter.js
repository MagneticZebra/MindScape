document.addEventListener('DOMContentLoaded', function() {
    // Array of quotes
    const quotes = [
        "\"The root of every problem is a lack of knowledge.\" - Robert Pianezza",
        "\"The only source of knowledge is experience.\" - Albert Einstein",
        "\"Happiness is when what you think, what you say, and what you do are in harmony.\" - Mahatma Gandhi",
        "\"You gain strength, courage, and confidence by every experience in which you really stop to look fear in the face.\" - Eleanor Roosevelt",
        "\"It always seems impossible until it's done.\" - Nelson Mandela"
    ];
    const quoteElement = document.getElementById('introQuote');
    const contentElement = document.getElementById('content');
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const selectedQuote = quotes[randomIndex];

    let index = 0;

    // Type out the quote letter by letter
    function typeQuote() {
        if (index < selectedQuote.length) {
            quoteElement.textContent += selectedQuote[index];
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

    // Start typing effect
    typeQuote();
});

function toggleMenu() {
    var menu = document.getElementById('nav-menu');
    var content = document.getElementById('main-content');
    var menuIcon = document.getElementsByClassName('menu-icon')[0]; // Get the menu icon element

    if (menu.style.left === '0px') {
        closeMenu();
    } else {
        menu.style.left = '0px';
        content.style.marginLeft = '250px';
        menuIcon.classList.add('hidden-icon'); // Hide the menu icon smoothly
    }
} 

function closeMenu() {
    var menu = document.getElementById('nav-menu');
    var content = document.getElementById('main-content');
    var menuIcon = document.getElementsByClassName('menu-icon')[0]; // Get the menu icon element

    menu.style.left = '-250px';
    content.style.marginLeft = '0';
    menuIcon.classList.remove('hidden-icon'); // Show the menu icon smoothly
}

// Function to close the navigation menu when clicking outside of it
function handleClickOutside(event) {
    var menu = document.getElementById('nav-menu');
    var menuIcon = document.getElementsByClassName('menu-icon')[0];

    // Check if the click target is outside the menu and the menu icon
    if (!menu.contains(event.target) && !menuIcon.contains(event.target)) {
        closeMenu();
    }
}

// Attach the click event listener to the document
document.addEventListener('click', handleClickOutside);