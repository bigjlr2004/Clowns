import { getReservations, deleteReservation, getClowns, sendCompletion, getCompletions } from "./dataAccess.js"

import { sortByDate } from "./dataAccess.js"


// function that converts reservations not in the completion dataset for html rendering
const convertReservation =(reservation) => {
    //returns the completions database
    const completions = getCompletions()
    //checks each object in the reservation database and returns the first element with a matching resevation
    //id from the completion database and stores that object in a variable called completionSet
    const completionSet = completions.find(complete => complete.reservationId === reservation.id)
    //logic that makes sure that a reservation is not in the completion set
    if(!completionSet) {
        const clowns = getClowns()
        return `
        <li> 
        <div class="reservation_row">
        Date Reserved: ${reservation.reservationDate} Parent's Name: ${reservation.parentName}  Child's Name: ${reservation.childsName} 
        
            <select class="clowns" id="clowns">
                <option value="">Choose</option>
                    ${
                        clowns.map(
                            clown => {
                            return `<option value="${reservation.id}--${clown.id}">${clown.name}</option>`
                            }
                        ).join("")
                    }
            </select>
            
            <button class="reservation__delete"
                id="reservation--${reservation.id}">
            Deny
            </button>
        </div>
        </li>`
}}


export const ReservationsRequested = () => {
    const reservations = sortByDate(getReservations())
    let html = `
        <ul>
            ${
                reservations.map(
                    (reservation) => {
                        return convertReservation(reservation)
                    }
                ).join("")
            }
        </ul>
    `

    return html
}

const mainContainer = document.querySelector("#container")
    mainContainer.addEventListener("click", click => {
        if (click.target.id.startsWith("reservation--")) {
            const [,reservationId] = click.target.id.split("--")
            deleteReservation(parseInt(reservationId))
            }
        })

mainContainer.addEventListener(
    "change",
        (event) => {
            if (event.target.id === "clowns") {
                const [reservationId, clownId] = event.target.value.split("--")
                
                const completion ={ 
                    reservationId: parseInt(reservationId),
                    clownId: parseInt(clownId),
                    date_created: Date()
                }
          sendCompletion(completion)
        
             }
        }
    )

const completeElements =(reservation) => {
    const completions = getCompletions()
        const completionSet = completions.find(complete => complete.reservationId === reservation.id)
        if(completionSet) {
            return `
            <li> 
                <div class="completion_row">
                Date Reserved: ${reservation.reservationDate}  Parent: ${reservation.parentName} 
                    
                    
                    <button class="reservation__delete" id="reservation--${reservation.id}">
                         Delete
                    </button>
                 </div>  
            </li>`
}
}
export const Completions = () => {
    const reservations = sortByDate(getReservations())

    let html = `
        <ul>
            ${
                reservations.map(
                    (reservation) => {
                        return completeElements(reservation)
                    }
                ).join("")
            }
        </ul>
    `

    return html
}


// mainContainer.addEventListener(
//     "change",
//     (event) => {
//         if (event.target.id === "clowns") {
//             const [reservationId, clownId] = event.target.value.split("--")
//                 const completion ={ 
//                     reservationId: parseInt(reservationId),
//                     clownId: parseInt(clownId),
//                     date_created: Date.now
//                 }
//           sendCompletion(completion)
        
//         }
//     }
// )