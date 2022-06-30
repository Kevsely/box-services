var navbar = document.getElementsByTagName("nav")[0];
var cta = document.getElementsByClassName("right-section")[0]


// When the user scrolls down, XXpx from the top of the document (then 650px), change the navbar color and shadow
function scrollFunction() {
    if (document.documentElement.scrollTop > 15 ) {
        navbar.style.boxShadow = "0 3px 5px rgba(0, 0, 0, 0.4)"
    } else {
        navbar.style.boxShadow = "none"
    }
}

// Event listeners
window.onscroll = function() {scrollFunction()};

// On load
scrollFunction()

setInterval(() => {
    cta.classList.add("shake-bottom")
    setTimeout(() => {
        cta.classList.remove("shake-bottom")
    }, 1000)
}, 10000)