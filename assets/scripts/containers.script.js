const inputCtnType = document.getElementsByName("ctn-type")
const resultsToFilter = document.getElementsByClassName("result");

// Hide elements that are not selected
function hideNonFilteredElements(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        while (arr1.indexOf(arr2[i]) > -1) {
            arr1.splice(arr1.indexOf(arr2[i]), 1);
        }
    }
    element.className = arr1.join(" ");
}

// Show filtered elements
function showFilteredElements(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        if (arr1.indexOf(arr2[i]) == -1) {
            element.className += " " + arr2[i];
        }
    }
}

function filterSelection(productFilter) {
    if (productFilter == "all") productFilter = "";
    // Add the "show" class (display:block) to the filtered elements, and remove the "show" class from the elements that are not selected
    for (var i = 0; i < resultsToFilter.length; i++) {
        hideNonFilteredElements(resultsToFilter[i], "show");
        if (resultsToFilter[i].className.indexOf(productFilter) > -1) {
            showFilteredElements(resultsToFilter[i], "show");
            console.log(resultsToFilter[i], "has been showned")
        }
    }
}

// Event listeners
// Apply the filter to all "filter" element
inputCtnType.forEach((ctnTypeRadio) => {
    ctnTypeRadio.addEventListener("change", () => {
        if (ctnTypeRadio.checked) filterSelection(ctnTypeRadio.value)
    })
})

// On load
filterSelection("all")