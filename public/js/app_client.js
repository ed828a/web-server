

// console.log('Client side javascript file is loaded.')

// fetch('http://localhost:3001/weather?address=boston')
//     .then(response => response.json())
//     .then(resJSON => {
//         console.log('response: ', resJSON)
//         if (resJSON.error) {
//             console.log(resJSON.error)
//         } else {
//             console.log(resJSON.forecast)
//         }
//     })
//     .catch(error => console.log("error: ", error));

const weatherForm = document.querySelector('form');
const search = document.querySelector('input')
const messageOne = document.querySelector('#message1')
const messageTwo = document.querySelector('#message2')

messageOne.textContent = '\r\n\n \n from javascript'
messageTwo.textContent = ''


weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const location = search.value;

    fetch(`http://localhost:3001/weather?address=${encodeURIComponent(location)}`)
        .then(response => response.json())
        .then(resJSON => {
            console.log('response: ', resJSON)
            if (resJSON.error) {
                messageTwo.textContent = resJSON.error
            } else {
                const {forecast, temperature, feels_like, location } = resJSON
                messageTwo.textContent = `Weather today: ${forecast} \n\r temperature: ${temperature} \n feels like: ${feels_like} \n ${location}`;
            }
        })
        .catch(error => messageTwo.textContent = error)

    console.log('testing!', location)
})