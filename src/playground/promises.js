const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        //resolve({ name: 'Ryan', age: 32 })
        reject('Something went wrong!')
    }, 5000)
})

console.log('before')

promise.then((data) => {
    console.log('1', data)
}).catch((data) => {
    console.log('error:', data)
})

console.log('after')