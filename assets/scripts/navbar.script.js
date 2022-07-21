const navbar = document.getElementsByTagName("nav")[0];
const toggler = document.querySelector("nav .toggler i")
const hiddenMenu = document.querySelector("nav div ul")
const cta = document.getElementsByClassName("right-section")[0]


// When the user scrolls down, XXpx from the top of the document (then 650px), change the navbar color and shadow
function scrollFunction() {
    if (document.documentElement.scrollTop > 15 ) {
        navbar.style.boxShadow = "0 3px 5px rgba(0, 0, 0, 0.4)"
    } else {
        navbar.style.boxShadow = "none"
    }
}

// Toggle the navbar 
function toggleNavbar() {
    // Change the toggler to the appropriate icon
    if (toggler.classList.contains("fa-bars"))
        toggler.classList.replace("fa-bars", "fa-xmark")
    else 
        toggler.classList.replace("fa-xmark", "fa-bars")

    // Display the ul containing the menu options
    if (window.getComputedStyle(hiddenMenu).display === "none") {
        hiddenMenu.style.display = "flex"
        cta.classList.remove("floating")
    }
    else {
        hiddenMenu.style.display = "none"
        cta.classList.add("floating")
    }
}

// Event listeners
window.onscroll = function() {scrollFunction()};

// On load
scrollFunction()

if (cta) {
    setInterval(() => {
        cta.classList.add("shake-bottom")
        setTimeout(() => {
            cta.classList.remove("shake-bottom")
        }, 1000)
    }, 10000)
}