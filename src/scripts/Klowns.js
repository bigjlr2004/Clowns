import { ReservationsRequested } from "./displayReservations.js"
import { ReservationForm } from "./reservations.js"
import { Completions } from "./displayReservations.js"

export const Klowns = () => {
    return `
        
        <img src="https://github.com/nashville-software-school/client-side-mastery/raw/cohort-61/book-6-a-sink-repair/chapters/images/buttons.jpeg" alt="">
        <h1>Buttons the Klown</h1>
        <section class="serviceForm">
        ${ReservationForm()}
        </section>

        
            <h2>Reservations</h2>
            <section class="serviceRequests">
            ${ReservationsRequested()}
            <div class="request_header">
                <div>Description</div>
                <div class="completed_by_header">Completed By</div>
                ${Completions()}
            </div>
          
        </section>
    `
}