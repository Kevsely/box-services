const statsEl = document.getElementsByClassName("counting")
var testimonialsWrapper = document.getElementById("testimonials-wrapper")
var testimonialElts = document.getElementsByClassName("testimonial-card")
// testimonialElts = [...testimonialElts]

// Global Variables
var statsAnimated = false

var currentlyHiddenTestimony = 3


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
    window.requestAnimationFrame(step)
}

function slideTestimony(direction) {
    // if direction's true - slide testimonial to left with right arrow
    // if direction's false - slide testimonial to right with left arrow

    if (direction) {
        // Make the shift
        // ...using a custom version of insertBefore in order to insertafter
        testimonialsWrapper.insertBefore(testimonialsWrapper.firstElementChild, testimonialsWrapper.lastElementChild.nextElementSibling)        
        // Show the third element
        testimonialsWrapper.children[2].hidden = false
        // Hide the last one
        testimonialsWrapper.lastElementChild.hidden = true
    } else {
        // Make the shift
        testimonialsWrapper.insertBefore(testimonialsWrapper.lastElementChild, testimonialsWrapper.firstElementChild)        
        // Show the first element
        testimonialsWrapper.firstElementChild.hidden = false
        // Hide the last one
        testimonialsWrapper.children[3].hidden = true
    }
}

// Event listeners
// When the scroll on the page past a certain stage, start the animation on stats
window.addEventListener("scroll", () => {
    if (!statsAnimated && document.documentElement.scrollTop > 300) {
        for(let i=0; i < statsEl.length; i++) {
            const lastVal = statsEl[i].getAttribute("data-count")
            animateCounting(statsEl[i], 0, lastVal, 5000)
        }
        statsAnimated = true;
    } 
    // else if (statsAnimated && document.documentElement.scrollTop < 300) {
    //     statsAnimated = false;
    // }
})

// On load
AOS.init();

// Tilt function on categorie selector
VanillaTilt.init(document.querySelectorAll(".hero .categories .category"), {
    max: 25,
    speed: 400, 
    glare: true,
    "max-glare": 0.5,
    scale: 1.1
});

// slideTestimonyToLeft()