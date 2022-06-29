// DOM Elements
var 

// Add items on the page to the cart in localStorage
function addToCart(productTileElt) {
    var cart, existingItem = false, existingItemIndex = -1

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