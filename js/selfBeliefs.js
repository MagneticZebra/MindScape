// Credit for form: https://github.com/Basir-PD/100-Projects-HTML-CSS-JavaScript/tree/master/32-%20Multi%20Step%20Form

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

//---------------------- Main Content --------------------------
function addBelief() {
    const input = document.getElementById('beliefInput');
    const newBelief = input.value.trim();
    if (newBelief) {
        const list = document.getElementById('beliefList');
        const entry = document.createElement('div');
        entry.textContent = newBelief;
        entry.addEventListener('click', () => {
            entry.classList.toggle('strikethrough');
        });
        list.appendChild(entry);
        input.value = '';
    }
}

function clearStrikethrough() {
    // Clear local storage
    localStorage.removeItem('beliefsData');

    // Clear the beliefs board
    document.getElementById('originalBeliefs').innerHTML = '';
    document.getElementById('transformedBeliefs').innerHTML = '';
}

//------------------------ Start Form ----------------

// Function to show the form
function startForm() {
  document.getElementById('belief-form').style.display = 'block';
  document.getElementById('startForm').style.display = 'none';
}

//------------------------ Form-----------------------
const prevBtns = document.querySelectorAll(".btn-prev");
const nextBtns = document.querySelectorAll(".btn-next");
const progress = document.getElementById("progress");
const formSteps = document.querySelectorAll(".form-step");
const progressSteps = document.querySelectorAll(".progress-step");

let formStepsNum = 0;

nextBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    formStepsNum++;
    updateFormSteps();
    updateProgressbar();
  });
});

prevBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    formStepsNum--;
    updateFormSteps();
    updateProgressbar();
  });
});

function updateFormSteps() {
  formSteps.forEach((formStep) => {
    formStep.classList.contains("form-step-active") &&
      formStep.classList.remove("form-step-active");
  });

  formSteps[formStepsNum].classList.add("form-step-active");
}

function updateProgressbar() {
  progressSteps.forEach((progressStep, idx) => {
    if (idx < formStepsNum + 1) {
      progressStep.classList.add("progress-step-active");
    } else {
      progressStep.classList.remove("progress-step-active");
    }
  });

  const progressActive = document.querySelectorAll(".progress-step-active");

  progress.style.width =
    ((progressActive.length - 1) / (progressSteps.length - 1)) * 100 + "%";
}

// Function to handle form submission
function submitForm() {
  const question11 = document.getElementById('question11').value.trim();
  const question12 = document.getElementById('question12').value.trim();

  // Display the responses in the respective sections
  const originalBeliefs = document.getElementById('originalBeliefs');
  const transformedBeliefs = document.getElementById('transformedBeliefs');

  // Clear previous entries
  originalBeliefs.innerHTML = '';
  transformedBeliefs.innerHTML = '';

  const originalBeliefsArray = [];
  const transformedBeliefsArray = [];

  // Create elements for the responses
  if (question11) {
      const entry11 = document.createElement('div');
      entry11.textContent = question11;
      originalBeliefs.appendChild(entry11);
      originalBeliefsArray.push(question11);
  }

  if (question12) {
      const entry12 = document.createElement('div');
      entry12.textContent = question12;
      transformedBeliefs.appendChild(entry12);
      transformedBeliefsArray.push(question12);
  }

  Swal.fire({
    title: "Form Completed",
    text: "Your results are stored below in the \"Beliefs Board\" for your convenience",
    icon: "success"
  });

  // Save to local storage
  saveBeliefsToLocalStorage(originalBeliefsArray, transformedBeliefsArray);

  // Prevent default form submission
  return false;
}

//-------------------- Local Storage Beliefs -------------------------
// Function to save beliefs to local storage
function saveBeliefsToLocalStorage(originalBeliefs, transformedBeliefs) {
  const beliefsData = {
      original: originalBeliefs,
      transformed: transformedBeliefs
  };
  localStorage.setItem('beliefsData', JSON.stringify(beliefsData));
}

// Function to load beliefs from local storage
function loadBeliefsFromLocalStorage() {
  const beliefsData = localStorage.getItem('beliefsData');
  if (beliefsData) {
      const parsedData = JSON.parse(beliefsData);
      const originalBeliefs = document.getElementById('originalBeliefs');
      const transformedBeliefs = document.getElementById('transformedBeliefs');

      // Clear previous entries
      originalBeliefs.innerHTML = '';
      transformedBeliefs.innerHTML = '';

      // Display the beliefs
      parsedData.original.forEach(belief => {
          const entry = document.createElement('div');
          entry.textContent = belief;
          originalBeliefs.appendChild(entry);
      });

      parsedData.transformed.forEach(belief => {
          const entry = document.createElement('div');
          entry.textContent = belief;
          transformedBeliefs.appendChild(entry);
      });
  }
}

// Load beliefs when the page loads
window.onload = function() {
  loadBeliefsFromLocalStorage();
}

//------------------ Download and Print Beliefs ------------------------
// Function to format beliefs into a document and download it
function downloadAndPrintBeliefs() {
  const originalBeliefs = document.getElementById('originalBeliefs').innerText;
  const transformedBeliefs = document.getElementById('transformedBeliefs').innerText;

  const docContent = `
  <html>
  <head>
      <title>My Beliefs</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              margin: 20px;
          }
          h2 {
              text-align: center;
          }
          .belief-section {
              margin-bottom: 20px;
          }
          .belief-section h3 {
              margin-bottom: 10px;
          }
          .belief-section div {
              margin-bottom: 5px;
          }
      </style>
  </head>
  <body>
      <h2>My Beliefs Document (read this every night)</h2>
      <div class="belief-section">
          <h3>Old Beliefs</h3>
          ${originalBeliefs.split('\n').map(belief => `<div>${belief}</div>`).join('')}
      </div>
      <div class="belief-section">
          <h3>New Beliefs</h3>
          ${transformedBeliefs.split('\n').map(belief => `<div>${belief}</div>`).join('')}
      </div>
  </body>
  </html>
  `;

  // Create a Blob with the document content
  const blob = new Blob([docContent], { type: 'text/html' });

  // Create an anchor element and trigger the download
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'myBeliefs.html';
  a.click();

  // Open the document in a new window and trigger the print dialog
  const newWindow = window.open();
  newWindow.document.write(docContent);
  newWindow.document.close();
  newWindow.print();
}



