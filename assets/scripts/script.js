const statsEl = document.getElementsByClassName("counting")
console.log(statsEl)

// Tilt function on categorie selector
VanillaTilt.init(document.querySelectorAll(".hero .categories .category"), {
    max: 25,
    speed: 400, 
    glare: true,
    "max-glare": 0.5,
    scale: 1.1
});

// Function to animate count in the stats section
function animateCounting(obj, initVal, lastVal, duration) {    
    let startTime = null;    
    //get the current timestamp and assign it to the currentTime variable
    let currentTime = Date.now();
    //pass the current timestamp to the step function
    const step = (currentTime ) => {
        //if the start time is null, assign the current time to startTime
        if (!startTime) {
            startTime = currentTime ;
        }
        //calculate the value to be used in calculating the number to be displayed
        const progress = Math.min((currentTime  - startTime) / duration, 1);
        //calculate what to be displayed using the value gotten above
        obj.textContent = Math.floor(progress * (lastVal - initVal) + initVal);
        //checking to make sure the counter does not exceed the last value (lastVal)
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
        else{
            window.cancelAnimationFrame(window.requestAnimationFrame(step));
        }
    };
    
    //start animating
    window.requestAnimationFrame(step);
}

for(let i=0; i < statsEl.length; i++) {
    const lastVal = statsEl[i].getAttribute("data-count")
    animateCounting(statsEl[i], 0, lastVal, 5000)
}