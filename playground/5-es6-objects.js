const name = 'Mateus'
const age = 25

const user = {
    name,
    age,
    location: 'Porto Alegre'
}

//console.log(user)


const product = {
    label: 'Red notebook',
    price: '3',
    stock: 201,
    salePrice: undefined,
    rating: 4.2
}

const transaction = (type, {label, stock}) => {
    console.log(type, label, stock)
}

transaction('order', product)