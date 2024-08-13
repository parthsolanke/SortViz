document.addEventListener('htmx:afterRequest', function(event) {
let steps = event.detail.xhr.response;
let visualizer = document.getElementById('visualizer');
visualizer.innerHTML = '';
steps = JSON.parse(steps);

const containerHeight = visualizer.clientHeight;
const maxValue = Math.max(...steps[0].array);
const scalingFactor = containerHeight / maxValue - 0.5; // Dynamically calculate scaling factor

// Initial visualization
steps[0].array.forEach(value => {
    let bar = document.createElement('div');
    bar.classList.add('bar');
    bar.style.height = (value * scalingFactor) + 'px';
    visualizer.appendChild(bar);
});

// Animation of sorting
steps.forEach((step, index) => {
    setTimeout(() => {
        step.array.forEach((value, i) => {
            let bar = visualizer.children[i];
            bar.style.height = (value * scalingFactor) + 'px';
        });
    }, index * 100);
});
});
