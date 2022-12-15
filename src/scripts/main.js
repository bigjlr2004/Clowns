

import { fetchReservations,fetchClowns, fetchCompletions } from "./dataAccess.js"
import { Klowns } from "./Klowns.js"



const mainContainer = document.querySelector("#container")

const render = () => {
    fetchReservations()
        .then(() => fetchClowns())
        .then(() => fetchCompletions())
        .then(
            () => {
                mainContainer.innerHTML = Klowns()
            }
        )
}


render()
mainContainer.addEventListener("stateChanged", event => {
    console.log("State of data has changed. Regenerating HTML...")
    render()
})