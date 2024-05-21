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
    entriesContainer.innerHTML = '';

    entries.reverse().forEach(function(entry, index) {
        var div = document.createElement('div');
        div.innerHTML = `<p id="entry-content-${entries.length - 1 - index}">${entry.content}</p>
                         <small>Submitted on: ${entry.date}</small>
                         <button class="edit-btn" onclick="editEntry(${entries.length - 1 - index})">Edit</button>
                         <button class="delete-btn" onclick="deleteEntry(${entries.length - 1 - index})">Delete</button>`;
        div.className = 'entry';
        entriesContainer.appendChild(div);
    });
}


function editEntry(index) {
    var entries = JSON.parse(localStorage.getItem('userEntries')) || [];
    var entryContent = document.getElementById(`entry-content-${index}`);
    var currentContent = entryContent.innerText;

    entryContent.innerHTML = `<textarea id="edit-textarea-${index}" rows="4" cols="50">${currentContent}</textarea>
                              <button onclick="saveEntry(${index})">Save</button>`;
}

function saveEntry(index) {
    var entries = JSON.parse(localStorage.getItem('userEntries')) || [];
    var editedContent = document.getElementById(`edit-textarea-${index}`).value;

    entries[index].content = editedContent;
    localStorage.setItem('userEntries', JSON.stringify(entries));

    loadEntries();
}

function deleteEntry(index) {
    var entries = JSON.parse(localStorage.getItem('userEntries')) || [];
    entries.splice(index, 1);
    localStorage.setItem('userEntries', JSON.stringify(entries));
    loadEntries();
}
