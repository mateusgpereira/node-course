require('../src/db/mongoose')

const User = require('../src/models/user')

// User.findByIdAndUpdate('5d32035584d9e00727082087', {age: 1}).then((user) => {
//     if(!user) {
//         return console.log('Not Found!')
//     }
//     console.log(user)
//     return User.countDocuments({age: 1})
// }).then((result) => {
//     console.log(result)

// }).catch((e) => {
//     console.log(e)
// })


const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id,{ age })
    const count = await User.countDocuments({ age: 1})
    
    return count
}

updateAgeAndCount('5d32035584d9e00727082087', 1).then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
})

console.log('é us guri')