const visualizer = document.getElementById('visualizer');
const snsButton = document.getElementById('play-pause');
const scalingFactor = visualizer.clientHeight / 40 - 0.25;
let steps = Array.from({ length: 40 }, (_, i) => i + 1);
let sortedSteps = null;
let animationInProgress = false;
let isSorted = false;
let isPaused = false;
let animationTimeouts = [];
let currentIndex = 0;

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
    steps = shuffleArray(steps);
    steps.forEach((value) => {
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.id = value;
        bar.textContent = value;
        bar.style.height = `${value * scalingFactor}px`;
        visualizer.appendChild(bar);
    });

    // reset the sorting state
    sortedSteps = null;
    isSorted = false;
    currentIndex = 0;
    animationTimeouts = [];
    isPaused = false;
}

function animateSorting(sortedSteps) {
    animationInProgress = true;
    isPaused = false;

    const speed = 10;

    sortedSteps.slice(currentIndex).forEach((currentStep, index) => {
        const timeout = setTimeout(() => {
            if (isPaused) return; // if paused, exit the function

            if (currentIndex > 0) {
                const previousStep = sortedSteps[currentIndex - 1];
                currentStep.array.forEach((value, i) => {
                    if (value !== previousStep[i]) {
                        const previousIndex = previousStep.array.indexOf(value);
                        if (previousIndex !== -1) {
                            const bar = document.getElementById(value.toString());
                            const targetBar = visualizer.children[i];
                            visualizer.insertBefore(bar, targetBar.nextSibling);
                        }
                    }
                });
            }

            currentIndex++;

            if (currentIndex === sortedSteps.length) {
                animationInProgress = false;
                isSorted = true;
                stopSorting();
            }
        }, index * speed);

        animationTimeouts.push(timeout);
    });
}

function getSortedArray() {
    if (sortedSteps === null) {
        const algorithmType = document.getElementById('algorithm').value;
        fetch('/sort', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ array: steps }),
        })
            .then((response) => response.json())
            .then((data) => {
                sortedSteps = data;
                animateSorting(sortedSteps);
            })
            .catch((error) => console.error('Error:', error));
    } else {
        animateSorting(sortedSteps); // resume animation if already sorted
    }
}

function startSorting() {
    if (!isSorted) {
        snsButton.classList.add('active');
        snsButton.innerHTML = '<i class="fas fa-pause"></i> Stop';
        snsButton.onclick = stopSorting;

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
    snsButton.classList.remove('active');
    snsButton.innerHTML = '<i class="fas fa-play"></i> Start';
    snsButton.onclick = startSorting;
    isPaused = true;

    // clear the timeouts to stop the ongoing animation
    animationTimeouts.forEach(timeout => clearTimeout(timeout));
    animationTimeouts = [];
}

document.addEventListener('DOMContentLoaded', () => {
    shuffleAndDisplay();
    snsButton.onclick = startSorting;
});
