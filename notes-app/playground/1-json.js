const fs = require('fs')

// const book = {
//     title: "Lord of Rings",
//     author: "Tolkien"
// }

// const bookJSON = JSON.stringify(book)
// fs.writeFileSync('1-json.json', bookJSON)

// const bookBuffer = fs.readFileSync('./1-json.json');
// const dataJson = bookBuffer.toString();
// const data = JSON.parse(dataJson);

// console.log(data.author)

const objBuffer = fs.readFileSync('./1-json.json')
const user = JSON.parse(objBuffer.toString())

user.name = 'Mateus'
user.age = 25

fs.writeFileSync('./1-json.json', JSON.stringify(user))