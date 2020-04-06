const weatherForm = document.querySelector('form');
const search = document.querySelector('input')
const messageOne = document.querySelector('#message1')
const messageTwo = document.querySelector('#message2')

messageOne.textContent = 'from javascript'
messageTwo.textContent = ''


weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const location = search.value;

    fetch(`/weather?address=${encodeURIComponent(location)}`)
        .then(response => response.json())
        .then(resJSON => {
            // console.log('response: ', resJSON)
            if (resJSON.error) {
                messageTwo.textContent = resJSON.error
            } else {
                const {forecast, temperature, feels_like, location } = resJSON
                messageOne.textContent = `${location}`
                messageTwo.textContent = `Weather today: ${forecast} ; temperature: ${temperature} ; feels like: ${feels_like}`;
            }
        })
        .catch(error => messageTwo.textContent = error)

    console.log('testing!', location)
})