const applicationState = {
    reservations:[],
    clowns:[],
    completions: []
}
const API = "http://localhost:8088"
const mainContainer = document.querySelector("#container")

export const fetchReservations = () => {
    return fetch(`${API}/reservations`)
        .then(response => response.json())
        .then(
            (reservations) => {
                // Store the external state in application state
                applicationState.reservations = reservations
            }
        )        
}

export const fetchClowns = () => {
    return fetch(`${API}/clowns`)
        .then(response => response.json())
        .then(
            (data) => {
                applicationState.clowns = data
            }
        )
}
export const fetchCompletions = () => {
    return fetch(`${API}/completions`)
        .then(response => response.json())
        .then(
            (data) => {
                applicationState.completions = data
            }
        )
}


export const sendReservation = (reservation) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(reservation)
    }
    return fetch(`${API}/reservations`, fetchOptions)
    .then(response => response.json())
    .then(() => {
        mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
    })
}
export const getReservations = () => {
    return applicationState.reservations.map((reservation) => ({ ...reservation }));
};
export const getClowns = () => {
    return applicationState.clowns.map((clown) => ({ ...clown }));
};
export const getCompletions = () => {
    return applicationState.completions.map((completion)=> ({...completion }))
}


export const deleteReservation = (id) => {
    return fetch(`${API}/reservations/${id}`, { method: "DELETE" })
        .then(
            () => {
                mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}
export const sendCompletion = (completionObj) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(completionObj)
    }
    return fetch(`${API}/completions`, fetchOptions)
    .then(response => response.json())
    .then(() => {
        mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
    })
}



export const sortByDate = (arr) => {
    const sorter = (a,b) => {
        return new Date(a.reservationDate).getTime() - new Date(b.reservationDate).getTime();
    }
   return arr.sort(sorter);
}