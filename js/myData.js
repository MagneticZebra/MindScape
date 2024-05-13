document.addEventListener('DOMContentLoaded', function() {
    const currentDate = new Date();
    const monthName = currentDate.toLocaleString('default', { month: 'long' });
    document.getElementById('monthName').textContent = `${monthName} Tracking`; // Updates the month name dynamically

    loadMoodDataAndRenderCharts(currentDate.getFullYear(), currentDate.getMonth() + 1);
    generateInsights(); // Call the function to generate insights on page load
});


function loadMoodDataAndRenderCharts(year, month) {
    const moodRecords = JSON.parse(localStorage.getItem('moodRecords')) || [];
    const daysInMonth = new Date(year, month, 0).getDate(); // Get number of days in the month

    const moodData = {
        sad: new Array(daysInMonth).fill(0),
        neutral: new Array(daysInMonth).fill(0),
        happy: new Array(daysInMonth).fill(0)
    };

    moodRecords.forEach(record => {
        const recordDate = new Date(record.date);
        if (recordDate.getFullYear() === year && recordDate.getMonth() === month - 1) {
            const day = recordDate.getDate() - 1; // Adjust because array is 0-indexed
            switch(record.emoji) {
                case '😢':
                    moodData.sad[day]++;
                    break;
                case '😐':
                    moodData.neutral[day]++;
                    break;
                case '😊':
                    moodData.happy[day]++;
                    break;
            }
        }
    });

    renderChart('sadChart', 'Sad Mood Count', moodData.sad, '#ff6384');
    renderChart('neutralChart', 'Neutral Mood Count', moodData.neutral, '#ffcd56');
    renderChart('happyChart', 'Happy Mood Count', moodData.happy, '#36a2eb');
}


function renderChart(canvasId, label, data, color) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    new Chart(ctx, {
        type: 'bar', // Or 'line', 'bar', etc., depending on your specific setup
        data: {
            labels: Array.from({ length: data.length }, (_, i) => i + 1),
            datasets: [{
                label: label,
                data: data,
                backgroundColor: color,
                borderColor: color,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false, // This will allow custom sizes
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        fontSize: 14 // Increase y-axis tick font size
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Day of the Month',
                        fontSize: 16 // Increase x-axis title font size
                    },
                    ticks: {
                        fontSize: 12 // Increase x-axis tick font size
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        fontSize: 14 // Increase legend font size
                    }
                },
                tooltip: {
                    bodyFontSize: 14, // Increase tooltip font size
                    titleFontSize: 16
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