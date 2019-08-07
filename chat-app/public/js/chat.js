const socket = io()

// Elements
const $msgForm = document.querySelector('#form-msg')
const $msgFormInput = $msgForm.querySelector('input')
const $msgFormButton = $msgForm.querySelector('button')
const $locationButton = document.querySelector('#send-location')
const $messages = document.querySelector('#messages')

// Templates
const messageTemplate = document.querySelector('#message-template').innerHTML
const mapsurlTemplate = document.querySelector('#mapsurl-template').innerHTML


const { username, room} = Qs.parse(location.search, { ignoreQueryPrefix: true})
console.log(username, room)

socket.on('message', (message) => {
    const html = Mustache.render(messageTemplate, { 
        message : message.text,
        createdAt: moment(message.createdAt).format('h:mm a')
    })
    $messages.insertAdjacentHTML('beforeend', html)
})

socket.on('locationMessage', (locationMessage) => {
    const html = Mustache.render(mapsurlTemplate, {
        url: locationMessage.url,
        createdAt: moment(locationMessage.createdAt).format('h:mm a')
    })
    $messages.insertAdjacentHTML('beforeend', html)
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

socket.emit('join',{ username, room},(error) => {
    if(error){
        alert(error)
        location.href='/'
    }
})