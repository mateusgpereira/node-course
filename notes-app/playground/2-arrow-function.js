// const square = function(x){
//     return x * x
// }

// console.log(square(3))

const event = {
    name: 'Birthday Party',
    guestList: ['Mateus', 'Zika', 'Braba'],
    printGuestList(){
        console.log('Guest list for ' + this.name)

        this.guestList.forEach((guest) => {
            console.log(`${guest} is attending to ${this.name}`)
        })
    }
}

event.printGuestList()