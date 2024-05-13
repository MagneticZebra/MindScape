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
