document.addEventListener('DOMContentLoaded', function() {
    const currentDate = new Date();
    const monthName = currentDate.toLocaleString('default', { month: 'long' });
    document.getElementById('monthName').textContent = `${monthName} Tracking`; // Updates the month name dynamically

    loadMoodDataAndRenderChart(currentDate.getFullYear(), currentDate.getMonth() + 1);
    generateInsights(); // Call the function to generate insights on page load
});


function loadMoodDataAndRenderChart(year, month) {
    const moodRecords = JSON.parse(localStorage.getItem('moodRecords')) || [];
    const daysInMonth = new Date(year, month, 0).getDate(); // Get number of days in the month

    const moodData = new Array(daysInMonth).fill(null);

    moodRecords.forEach(record => {
        const recordDate = new Date(record.date);
        if (recordDate.getFullYear() === year && recordDate.getMonth() === month - 1) {
            const day = recordDate.getDate() - 1; // Adjust because array is 0-indexed
            switch(record.emoji) {
                case '😢':
                    moodData[day] = 0;
                    break;
                case '😐':
                    moodData[day] = 1;
                    break;
                case '😊':
                    moodData[day] = 2;
                    break;
            }
        }
    });

    renderMoodChart('moodChart', moodData, daysInMonth);
}

function renderMoodChart(canvasId, moodData, daysInMonth) {
    const ctx = document.getElementById(canvasId).getContext('2d');

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({ length: daysInMonth }, (_, i) => i + 1),
            datasets: [
                {
                    label: 'Mood',
                    data: moodData,
                    fill: false,
                    tension: 0.4,  // Smooth the line
                    spanGaps: true,  // Allows line to span gaps in the data
                    borderColor: function(context) {
                        const index = context.dataIndex;
                        const value = context.dataset.data[index];
                        if (value === 0) return '#ff6384'; // Sad
                        if (value === 1) return '#ffcd56'; // Neutral
                        return '#36a2eb'; // Happy
                    },
                    backgroundColor: function(context) {
                        const index = context.dataIndex;
                        const value = context.dataset.data[index];
                        if (value === 0) return '#ff6384'; // Sad
                        if (value === 1) return '#ffcd56'; // Neutral
                        return '#36a2eb'; // Happy
                    },
                    pointBackgroundColor: function(context) {
                        const value = context.raw;
                        return value === 0 ? '#ff6384' : value === 1 ? '#ffcd56' : '#36a2eb';
                    },
                    pointBorderColor: function(context) {
                        const value = context.raw;
                        return value === 0 ? '#ff6384' : value === 1 ? '#ffcd56' : '#36a2eb';
                    },
                    pointStyle: 'circle',
                    pointRadius: 5,
                    pointHoverRadius: 7
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    min: -0.7,
                    max: 2.7,
                    ticks: {
                        callback: function(value) {
                            const emojis = ['😢', '😐', '😊'];
                            return emojis[value];
                        },
                        font: {
                            size: 24  // Increase the font size to make emojis larger
                        },
                        stepSize: 1
                    }
                },
                x: {
                    ticks: {
                        font: {
                            size: 12
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const emojis = ['😢', '😐', '😊'];
                            return emojis[context.raw];
                        }
                    },
                    bodyFontSize: 14,
                    titleFontSize: 16
                },
                title: {
                    display: true,
                    text: 'Mood Chart',
                    font: {
                        size: 24
                    },
                    padding: {
                        top: 10,
                        bottom: 30
                    }
                }
            }
        }
    });
}

function generateInsights() {
    const moodRecords = JSON.parse(localStorage.getItem('moodRecords')) || [];
    const counts = { happy: 0, neutral: 0, sad: 0 };

    // Count each type of emoji
    moodRecords.forEach(record => {
        if (record.emoji === '😊') counts.happy++;
        if (record.emoji === '😐') counts.neutral++;
        if (record.emoji === '😢') counts.sad++;
    });

    // Generate an insightful message based on the counts
    let insightMessage = '';

    if (counts.happy > counts.sad) {
        insightMessage = `Great work! You've been feeling awesome lately which we love to see! Keep it up! Don't forget to spread the love to others today in whatever way possible! 🌟`;
    } else if (counts.sad > counts.happy) {
        insightMessage = `It seems like you've been having a difficult time lately. That's okay! Remember that it's okay to feel down sometimes. Take some time to care for yourself and reach out if you need support. 💙
        Something\'s you might like to try are:
        1. Walking outside for 10 minutes
        2. Taking a short nap
        3. Doing a meditation exercise/praying
        4. Letting yourself feel what you're feeling (remember there's nothing wrong with feeling bad sometimes. We all do!)`;
    } else {
        insightMessage = `You've been pretty balanced in terms of your emotions this month. That's amazing! Keep focusing on maintaining positivity and seek support when necessary.💙 Remember, life moves in peaks and troughs so I'm  sure you'll be feeling great again soon!`;
    }

    // Display the message in the insights section
    document.getElementById('insightContent').textContent = insightMessage;
}


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