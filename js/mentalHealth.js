var currentEmoji = null; // keeps track of the current emoji selected

// Function to update local storage
function updateLocalStorage(tableauId, items) {
    localStorage.setItem(tableauId, JSON.stringify(items));
}

// Add a new item to the tableau
function addItemToTableau(text, tableau, tableauId) {
    var list = tableau.querySelector('.tableau-list');
    var entry = document.createElement('li');
    var deleteBtn = document.createElement('button');

    entry.textContent = text;
    deleteBtn.textContent = 'x';
    deleteBtn.className = 'delete-btn';
    deleteBtn.onclick = function() {
        list.removeChild(entry);
        // Update local storage after removal
        updateLocalStorage(tableauId, Array.from(list.children).map(li => li.textContent.slice(0, -1))); // Slice to remove the 'x'
    };

    entry.appendChild(deleteBtn);
    list.appendChild(entry);

    // Update local storage with the new list
    updateLocalStorage(tableauId, Array.from(list.children).map(li => li.textContent.slice(0, -1)));
}

// Function to handle the Enter key event for submitting responses
function handleEnterKeyEvent(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault(); // Prevent default to avoid new line in textarea
        var text = inputBox.value.trim();

        if (text !== "") {
            // Use the currentEmoji to determine where to add the item
            if (currentEmoji.textContent === '😊') {
                addItemToTableau(text, winsTableau, 'wins');
            } else {
                addItemToTableau(text, lessonsTableau, 'lessons');
            }
            inputBox.value = ''; // Clear the input box after submitting
            responseContainer.style.display = 'none'; // Hide only the container with the input and submit button
        }
    }
}

// Attach the Enter key event listener to the input box
document.getElementById('response-input').addEventListener('keydown', handleEnterKeyEvent);

document.querySelectorAll('.emoji').forEach(emoji => {
    emoji.addEventListener('click', function() {
        var responseElement = document.getElementById('emoji-response');
        var responseContainer = document.getElementById('response-container');
        var winsTableau = document.getElementById('wins-tableau');
        var lessonsTableau = document.getElementById('lessons-tableau');
        var submitButton = document.getElementById('response-submit');
        var inputBox = document.getElementById('response-input');

        const currentDate = new Date();
        const today = currentDate.toISOString().split('T')[0]; // Get date as "yyyy-mm-dd"

        let moodRecords = JSON.parse(localStorage.getItem('moodRecords')) || [];
        let alreadyRecorded = moodRecords.some(record => {
            const recordDate = new Date(record.date).toISOString().split('T')[0];
            return recordDate === today;
        });

        if (!alreadyRecorded) {
            currentEmoji = this;

        // Clear any previous onclick event to avoid stacking event listeners
        submitButton.onclick = null;

            if (this.textContent === '😊') {
                responseElement.textContent = "That's awesome! What's making you feel so great?";
            } else if (this.textContent === '😐') {
                responseElement.textContent = "Cool cool! Is there anything you can do to boost your mood?";
            } else {
                responseElement.textContent = "That's okay! It's all part of the journey. Think about what made you feel this way and what lesson(s) you learned from it?";
            }
            responseContainer.style.display = 'inline-block'; // Show the container, which includes the input and submit button

            submitButton.onclick = function() {
                var text = inputBox.value.trim();
                if (text !== "") {
                    if (emoji.textContent === '😊') {
                        addItemToTableau(text, winsTableau, 'wins');
                    } else {
                        addItemToTableau(text, lessonsTableau, 'lessons');
                    }
                    inputBox.value = ''; // Clear the input box after submitting
                    responseContainer.style.display = 'none';
                    responseElement.style.display = 'none';
                }
            };
            moodRecords.push({
                emoji: this.textContent,
                date: currentDate
            });
            localStorage.setItem('moodRecords', JSON.stringify(moodRecords));
    
            Swal.fire({
                title: "Entry Saved Successfully",
                text: "Your mood has been recorded for today!",
                icon: "success"
            });
        } else {
            Swal.fire({
                title: "Error",
                text: "You have already recorded your mood today!",
                icon: "error"
            });
        }
    });
});

// Function to load items from local storage and display them
function loadItems(tableau, tableauId) {
    var items = JSON.parse(localStorage.getItem(tableauId));
    if (items) {
        items.forEach(itemText => addItemToTableau(itemText, tableau, tableauId));
    }
}

document.addEventListener('DOMContentLoaded', function() {
    var winsTableau = document.getElementById('wins-tableau');
    var lessonsTableau = document.getElementById('lessons-tableau');
    loadItems(winsTableau, 'wins');
    loadItems(lessonsTableau, 'lessons');
});

document.getElementById('journal-trigger-button').addEventListener('click', function() {
    var journalPanel = document.getElementById('journal-panel');
    journalPanel.classList.toggle('journal-open');
    journalPanel.classList.toggle('journal-closed');
});

document.getElementById('close-journal-panel').addEventListener('click', function() {
    var journalPanel = document.getElementById('journal-panel');
    journalPanel.classList.toggle('journal-open');
    journalPanel.classList.toggle('journal-closed');
});

//---------------------- Nav Menu -------------------------
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


//--------------------- Submitting entry -------------------------
function submitEntry() {
    var userInput = document.getElementById('journal-textarea').value.trim();
    var currentDate = new Date(); // Gets current date and time
    var entries = JSON.parse(localStorage.getItem('userEntries')) || []; // Retrieves existing entries or initializes a new array

    // Create an entry object
    var entry = {
        content: userInput,
        date: currentDate.toLocaleString() // Converts date object to a readable string
    };

    if (userInput) {
        // Add the new entry to the array
        entries.push(entry);

        // Save the updated array back to local storage
        localStorage.setItem('userEntries', JSON.stringify(entries));

        // Optionally clear the input field
        document.getElementById('journal-textarea').value = '';

        Swal.fire({
            title: "Entry Saved Successfully",
            text: "Go to \"My entries\" to view",
            icon: "success"
        });
    } else {
        // Error message if the text area is empty
        Swal.fire({
            title: "Error",
            text: "You must write something in your journal before saving.",
            icon: "error"
        });
    }
}

// This function is triggered when an emoji is clicked
function trackEmojiSelection(emoji) {
    var moodRecords = JSON.parse(localStorage.getItem('moodRecords')) || [];
    var currentDate = new Date();

    moodRecords.push({
        emoji: emoji.textContent, // Save the emoji used
        date: currentDate.toLocaleString() // Save the current date and time
    });

    localStorage.setItem('moodRecords', JSON.stringify(moodRecords));
}

