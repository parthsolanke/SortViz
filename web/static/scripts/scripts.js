const visualizer = document.getElementById('visualizer');
const snsButton = document.getElementById('play-pause');
const speedControl = document.getElementById('speed');
const scalingFactor = visualizer.clientHeight / 40 - 0.25;
let steps = Array.from({ length: 40 }, (_, i) => i + 1);
let sortedSteps = null;
let animationInProgress = false;
let isSorted = false;
let isPaused = false;
let animationTimeouts = [];
let currentIndex = 0;
let speed = 10;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function shuffleAndDisplay() {
    if (animationInProgress) {
        alert('Sorting in progress!');
        return;
    }

    visualizer.innerHTML = '';
    const fragment = document.createDocumentFragment();

    steps = shuffleArray(steps);
    steps.forEach((value) => {
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.id = value;
        bar.textContent = value;
        bar.style.height = `${value * scalingFactor}px`;
        fragment.appendChild(bar);
    });

    visualizer.appendChild(fragment);

    resetSortingState();
}

function resetSortingState() {
    sortedSteps = null;
    isSorted = false;
    currentIndex = 0;
    isPaused = false;
    clearTimeouts();
}

function clearTimeouts() {
    animationTimeouts.forEach(timeout => clearTimeout(timeout));
    animationTimeouts = [];
}

function animateSorting(sortedSteps) {
    animationInProgress = true;
    isPaused = false;

    function runAnimationStep(index) {
        if (isPaused || index >= sortedSteps.length) return;

        const currentStep = sortedSteps[index];
        if (index > 0) {
            updateVisualizer(currentStep, sortedSteps[index - 1]);
        }

        currentIndex++;

        if (currentIndex === sortedSteps.length) {
            finishSorting();
        } else {
            animationTimeouts.push(setTimeout(() => runAnimationStep(index + 1), speed));
        }
    }

    runAnimationStep(currentIndex);
}

function updateVisualizer(currentStep, previousStep) {
    currentStep.array.forEach((value, i) => {
        if (value !== previousStep[i]) {
            const bar = document.getElementById(value.toString());
            const targetBar = visualizer.children[i];
            visualizer.insertBefore(bar, targetBar.nextSibling);
        }
    });
}

function finishSorting() {
    animationInProgress = false;
    isSorted = true;
    stopSorting();
}

function getSortedArray() {
    if (sortedSteps === null) {
        const algorithmType = document.getElementById('algorithm').value;
        fetch('/sort', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ array: steps }),
        })
            .then(response => response.json())
            .then(data => {
                sortedSteps = data;
                animateSorting(sortedSteps);
            })
            .catch(error => console.error('Error:', error));
    } else {
        animateSorting(sortedSteps);
    }
}

function startSorting() {
    if (!isSorted) {
        updateButtonState(true);
        if (isPaused) {
            animateSorting(sortedSteps);
        } else {
            getSortedArray();
        }
    } else {
        alert('Array already sorted!');
    }
}

function stopSorting() {
    updateButtonState(false);
    isPaused = true;
    clearTimeouts();
}

function updateButtonState(isSorting) {
    snsButton.classList.toggle('active', isSorting);
    snsButton.innerHTML = isSorting ? '<i class="fas fa-pause"></i> Stop' : '<i class="fas fa-play"></i> Start';
    snsButton.onclick = isSorting ? stopSorting : startSorting;
}

document.addEventListener('DOMContentLoaded', () => {
    shuffleAndDisplay();
    snsButton.onclick = startSorting;

    speedControl.addEventListener('input', (event) => {
        const speedValue = event.target.value;
        speed = (11 - speedValue) * 5;
    });
});
