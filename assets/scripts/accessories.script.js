const inputAccessoryType = document.getElementsByName("accessory-type")
const resultsToFilter = document.getElementsByClassName("result");

var currentFilter = ["fermeture"]

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

// Filter Multiple Elements
function filterSelection(productFilter) {
    // Add the "show" class (display:block) to the filtered elements, and remove the "show" class from the elements that are not selected
    for (var i = 0; i < resultsToFilter.length; i++) {
        hideNonFilteredElements(resultsToFilter[i], "show");
        for(var j = 0; j < productFilter.length; j++) {
            if (resultsToFilter[i].className.indexOf(productFilter[j]) > -1) {
                showFilteredElements(resultsToFilter[i], "show")
            }
        }
    }
}

// Event listener
inputAccessoryType.forEach((accessoryTypeCheckbox) => {
    accessoryTypeCheckbox.addEventListener("change", () => {
        if (accessoryTypeCheckbox.checked) {
            currentFilter.push(accessoryTypeCheckbox.value)
        } else {
            currentFilter = currentFilter.filter(newFilter => newFilter !== accessoryTypeCheckbox.value)
        }
        filterSelection(currentFilter)
    })
})

// On load
filterSelection(currentFilter)