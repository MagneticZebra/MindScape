// Credit for form: https://github.com/Basir-PD/100-Projects-HTML-CSS-JavaScript/tree/master/32-%20Multi%20Step%20Form

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
    const list = document.getElementById('beliefList');
    Array.from(list.children).forEach(child => {
        if (child.classList.contains('strikethrough')) {
            list.removeChild(child);
        }
    });
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

function submitForm() {
    const question11 = document.getElementById('question11').value.trim();
    const question12 = document.getElementById('question12').value.trim();

    // Display the responses in the respective sections
    const beliefList11 = document.getElementById('beliefList11');
    const beliefList12 = document.getElementById('beliefList12');

    // Create elements for the responses
    const entry11 = document.createElement('div');
    entry11.textContent = question11;
    beliefList11.appendChild(entry11);

    const entry12 = document.createElement('div');
    entry12.textContent = question12;
    beliefList12.appendChild(entry12);
    
    Swal.fire({
        title: "Form Completed",
        text: "Your results are stored below for your convenience",
        icon: "success"
    });
}
