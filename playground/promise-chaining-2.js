require('../src/db/mongoose')
const Task = require('../src/models/task')

// Task.findByIdAndDelete('5d35a4a265973b02edf20f36').then((task) => {
//     if(task){
//         console.log(task)
//     }

//     return Task.countDocuments({completed : false})
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

const deleteTaskAndCount = async (id) => {

    var task = await Task.findByIdAndDelete(id)
    var count = await Task.countDocuments({completed : false})

    return count
}

deleteTaskAndCount('5d35a9892339f10309c6b6b7').then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
})

console.log('é us guri du corre')