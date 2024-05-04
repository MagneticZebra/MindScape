document.addEventListener('DOMContentLoaded', function() {
    // Array of quotes
    const quotes = [
        "\"Calm mind brings inner strength and self-confidence, so that's very important for good health.\" - Dalai Lama",
        "\"The greatest weapon against stress is our ability to choose one thought over another.\" - William James",
        "\"You cannot always control what goes on outside, but you can always control what goes on inside.\" - Wayne Dyer",
        "\"Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.\" - Buddha",
        "\"You, yourself, as much as anybody in the entire universe, deserve your love and affection.\" - Buddha"
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