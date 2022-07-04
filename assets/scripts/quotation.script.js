// DOM Element
const quotationTableBody = document.getElementsByClassName("quotation-body")[0]
const quotationTableEstimatedPrice = document.getElementById("totalEstimation")
const isEntrepriseElt = document.querySelector(".address-wrapper label[for=for-entreprise] input")
const entrepriseInputElt = document.querySelector(".address-wrapper label[for=entreprise]")
const submitButton = document.getElementsByClassName("send-my-request")[0]

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

function sendEmail(imagePath) {
    // Sending the form by email
    Email.send({
        Host : "smtp.elasticemail.com",
        Port : 2525,
        Username : "skybet229@gmail.com",
        Password : "4E5E1FB5522D2878C956A7C7983E5D566FC9",
        To : 'elegis.sossou@gmail.com',
        From : "skybet229@gmail.com",
        Subject : "Nouvelle demande de devis",
        Body : "Vous venez de recevoir une nouvelle demande de devis. Cliquez sur le lien suivant pour consulter",
        Attachments : [
            {
                name : "new_quotation.png",
                data : imagePath
            }]
    }).then(
        alert("Demande de devis envoyée avec succès")
    );
}

function sendAskForQuotation() {
    // Generate PNG
    html2canvas(document.getElementsByClassName("quotation-page-wrapper")[0]).then(function(canvas) {
        sendEmail(canvas.toDataURL("image/png"))
    });


}

// Event Listeners
window.addEventListener("storage", fillQuotationTable)
isEntrepriseElt.addEventListener("change", () => {
    entrepriseInputElt.style.display = `${isEntrepriseElt.checked ? "flex" : "none"}`
})
submitButton.addEventListener("click", sendAskForQuotation)


// On load
fillQuotationTable()
