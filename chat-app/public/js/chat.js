const socket = io()

const $msgForm = document.querySelector('#form-msg')
const $msgFormInput = $msgForm.querySelector('input')
const $msgFormButton = $msgForm.querySelector('button')
const $locationButton = document.querySelector('#send-location')


socket.on('message', (message) => {
    console.log(message)
})

$msgForm.addEventListener('submit', (e) => {
    e.preventDefault()
    $msgFormButton.setAttribute('disabled', 'disabled')
    let msg = e.target.elements.message.value

    socket.emit('sendMessage', msg, (error) => {
        $msgFormButton.removeAttribute('disabled')
        $msgFormInput.value = ''
        $msgFormInput.focus()

        if (error) {
            return console.log(error)
        }
        console.log('Message delivered!')
    })
})

$locationButton.addEventListener('click', () => {
    if (!navigator.geolocation) {
        alert('Your browser does not support geolocation')
    }
    $locationButton.setAttribute('disabled', 'disabled')

    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit('sendLocation', {
            lat: position.coords.latitude,
            long: position.coords.longitude
        }, () => {
            console.log('Location shared!')
            $locationButton.removeAttribute('disabled')
        })
    })
})