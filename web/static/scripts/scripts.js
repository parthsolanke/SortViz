// document.addEventListener('htmx:afterRequest', function(event) {
//     let steps = event.detail.xhr.response;
//     let visualizer = document.getElementById('visualizer');
//     visualizer.innerHTML = '';
//     steps = JSON.parse(steps);

//     const containerHeight = visualizer.clientHeight;
//     const maxValue = Math.max(...steps[0].array);
//     const scalingFactor = containerHeight / maxValue - 0.5;

//     // Initial visualization
//     steps[0].array.forEach(value => {
//         let bar = document.createElement('div');
//         bar.classList.add('bar');
//         bar.style.height = (value * scalingFactor) + 'px';
//         visualizer.appendChild(bar);
//     });

//     // Animation of sorting
//     steps.forEach((step, index) => {
//         setTimeout(() => {
//             step.array.forEach((value, i) => {
//                 let bar = visualizer.children[i];
//                 bar.style.height = (value * scalingFactor) + 'px';
//             });
//         }, index * 100);
//     });
// });

let visualizer = document.getElementById('visualizer');
let steps = Array.from({length: 40}, (_, i) => i + 1);
let sortedSteps = null;

const containerHeight = visualizer.clientHeight;
const scalingFactor = containerHeight / Math.max(...steps) - 0.25;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function shuffleAndDisplay() {
    visualizer.innerHTML = '';
    steps = shuffleArray(steps);
    steps.forEach(value => {
        let bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.height = (value * scalingFactor) + 'px';
        bar.textContent = value;
        visualizer.appendChild(bar);
    });
    sortedSteps = null;
}

function animateSorting(sortedSteps) {
    sortedSteps.forEach((step, index) => {
        setTimeout(() => {
            step.array.forEach((value, i) => {
                let bar = visualizer.children[i];
                bar.style.height = (value * scalingFactor) + 'px';
            });
        }, index * 100);
    });
}

function getSortedArray() {
    if (sortedSteps === null) {
        const algorithmType = document.getElementById('algorithm').value;
        fetch(
            '/sort',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({array: steps})
            }
        )
        .then(response => response.json())
        .then(data => {
            sortedSteps = data;
            animateSorting(sortedSteps);
        })
        .catch(error => console.error('Error:', error));
    } else {
        alert('Request already made!');
    }
}

shuffleAndDisplay();

