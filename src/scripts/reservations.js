import { sendReservation } from "./dataAccess.js"
export const ReservationForm = () => {
    let html = `
        <div class="field">
            <label class="label" for="parentName">Parent Name</label>
            <input type="text" name="parentName" class="input" />
        </div>
        <div class="field">
            <label class="label" for="childsName">Child's Name</label>
            <input type="text" name="childsName" class="input" />
        </div>
        <div class="field">
            <label class="label" for="numOfChildren">Number of Children</label>
            <input type="number" name="numOfChildren" class="input" />
        </div>  
        <div class="field">
            <label class="label" for="reservationLength">Length of Reservation in Hours</label>
            <input type="number" name="reservationLength" class="input" />
        </div>
        <div class="field">
            <label class="label" for="reservationAddress">Party Address</label>
            <input type="text" name="reservationAddress" class="input" />
        </div>
        <div class="field">
            <label class="label" for="reservationDate">Reservation Date</label>
            <input type="date" name="reservationDate" class="input" />
        </div>

        <button class="button" id="submitRequest">Reserve Clown</button>
    `

    return html
}
const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "submitRequest") {
        // Get what the user typed into the form fields
        const parentName = document.querySelector("input[name='parentName']").value
        const childsName = document.querySelector("input[name='childsName']").value
        const numOfChildren = document.querySelector("input[name='numOfChildren']").value
        const reservationLength = document.querySelector("input[name='reservationLength']").value
        const reservationAddress = document.querySelector("input[name='reservationAddress']").value
        const reservationDate = document.querySelector("input[name='reservationDate']").value

        // Make an object out of the user input
        const dataToSendToAPI = {
            parentName: parentName,
            childsName: childsName,
            numOfChildren: numOfChildren,
            reservationLength: reservationLength,
            reservationAddress: reservationAddress,
            reservationDate: reservationDate
        }

        // Send the data to the API for permanent storage
        sendReservation(dataToSendToAPI)
    }
})