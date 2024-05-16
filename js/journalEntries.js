window.onload = loadEntries;

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

function loadEntries() {
    var entries = JSON.parse(localStorage.getItem('userEntries')) || [];
    var entriesContainer = document.getElementById('entriesContainer');
    entriesContainer.innerHTML = ''; // Clear existing entries before loading new ones

    // Reverse the entries array to show the newest entries first
    entries.reverse().forEach(function(entry, index) {
        var div = document.createElement('div');
        div.innerHTML = `<p>${entry.content}</p>
                         <small>Submitted on: ${entry.date}</small>
                         <button onclick="deleteEntry(${entries.length - 1 - index})">Delete</button>`;
        div.className = 'entry';
        entriesContainer.appendChild(div);
    });
}

function deleteEntry(index) {
    var entries = JSON.parse(localStorage.getItem('userEntries')) || [];
    entries.splice(index, 1); // Remove the entry at the specified index
    localStorage.setItem('userEntries', JSON.stringify(entries)); // Update local storage
    loadEntries(); // Reload entries to update the display
}
