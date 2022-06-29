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
        }
    }
}

function addToCart(productTileElt) {
    var cart, existingItem = false, existingItemIndex = -1

    // Children list
    // 0. price
    // 1. preview
    // 2. designation
    // 3. quantity

    // Extract item elt from DOM
    const itemToAdd =  {
        preview: productTileElt.children[1].src,
        designation: productTileElt.children[2].textContent,
        unitPrice: +productTileElt.children[0].getAttribute("price"),
        quantity: +productTileElt.children[3].firstElementChild.value
    }
    
    // Prepare an internal cart
    if (window.localStorage.getItem("cart")) {
        cart = JSON.parse(window.localStorage.getItem("cart"))
        // Check if the item exists in the current cart
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].designation === itemToAdd.designation) {
                existingItem = true
                existingItemIndex = i
                break
            }
        }

        if (existingItem) {
            cart[existingItemIndex].quantity += itemToAdd.quantity
        } else {
            cart.push(itemToAdd)
        }
    } else {
        cart = [itemToAdd]
    }

    // ...then add it localStorage
    window.localStorage.setItem("cart", JSON.stringify(cart))
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