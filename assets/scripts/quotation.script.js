// DOM Element
const quotationTableBody = document.getElementsByClassName("quotation-body")[0]
const quotationTableEstimatedPrice = document.getElementById("totalEstimation")

function numberWithPoint(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function fillQuotationTable() {
    const cart = JSON.parse(window.localStorage.getItem("cart"))
    var totalEstimation = 0

    // Reset the table body before starting the update
    quotationTableBody.textContent = ""

    if (cart) {
        for (var i=0; i < cart.length; i++) {
            // Create a table Row
            const tableRow = document.createElement("tr")

            // N° Cell
            const tdNumber = document.createElement("td")
            const numberText = (i+1).toString()
            tdNumber.textContent = `${(numberText.length === 1) ? "0" : ""}${numberText}`
            tableRow.appendChild(tdNumber)
            
            // Preview Cell
            const tdImg = document.createElement("td")
            const imgElt = document.createElement("img")
            imgElt.src = cart[i].preview
            tdImg.appendChild(imgElt)
            tableRow.appendChild(tdImg)
            
            // Designation Cell
            const tdName = document.createElement("td")
            tdName.textContent = cart[i].designation
            tableRow.appendChild(tdName)
            
            // Unit Price Cell
            const tdUnitPrice = document.createElement("td")
            tdUnitPrice.textContent = `${numberWithPoint(cart[i].unitPrice)} €`
            tableRow.appendChild(tdUnitPrice)
            
            // Quantity Cell
            const tdQuantity = document.createElement("td")
            const quantityText = cart[i].quantity.toString()
            tdQuantity.textContent = `${(quantityText.length === 1) ? "0" : ""}${quantityText}`
            tableRow.appendChild(tdQuantity)
            
            // Total Price Cell
            const tdTotalPrice = document.createElement("td")
            const totalPrice = cart[i].unitPrice * cart[i].quantity
            totalEstimation += totalPrice // Updating the quotation estimation
            tdTotalPrice.textContent = `${numberWithPoint(totalPrice)} €`
            tableRow.appendChild(tdTotalPrice)
            
            // Trash Bin Cell
            const tdTrash = document.createElement("td")
            tdTrash.innerHTML = '<i class="fa-solid fa-trash-can" onclick="removeElement(this.parentElement.parentElement)"></i>'
            tableRow.appendChild(tdTrash)

            // Append the final row to the table
            quotationTableBody.appendChild(tableRow)
        }
        // Display the estimation
        quotationTableEstimatedPrice.textContent = `${numberWithPoint(totalEstimation)} €`
    }
}

function removeElement(itemToRemove) {
    console.log(itemToRemove)
    // Get a copy of the cart in LS
    var cart = JSON.parse(window.localStorage.getItem("cart"))

    // Remove the element in the LS
    cart.splice(+itemToRemove.firstElementChild.textContent-1, 1)
    window.localStorage.setItem("cart", JSON.stringify(cart))

    fillQuotationTable()
}

// Event Listeners
window.addEventListener("storage", fillQuotationTable)

// On load
fillQuotationTable()