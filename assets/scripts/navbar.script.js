var navbar = document.getElementsByTagName("nav")[0];


// When the user scrolls down, XXpx from the top of the document (then 650px), change the navbar color and shadow
function scrollFunction() {
    if (document.documentElement.scrollTop > 15 && document.documentElement.scrollTop <= 600) {
        navbar.style.boxShadow = "0 3px 5px rgba(0, 0, 0, 0.4)"
        navbar.style.backgroundColor = "rgba(2, 86, 122, 0.322)"
    } else if (document.documentElement.scrollTop > 600) {
        navbar.style.boxShadow = "0 3px 5px rgba(0, 0, 0, 0.4)"
        navbar.style.backgroundColor = "rgba(2, 86, 122, 0.8)"
    } else {
        navbar.style.boxShadow = "none"
        navbar.style.backgroundColor = "transparent"
    }
}

// Event listeners
window.onscroll = function() {scrollFunction()};
