const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(a + b)
        }, 2000)

    })
}

const doWork = async () => {
    var sum = await add(1,2)
    return sum
}

doWork().then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
})

console.log('digdin')