// const person = {
//     name: 'Ryan',
//     age: 32,
//     location: {
//         city: 'Brownsburg',
//         temp: 74
//     }
// }

// const { name: firstName = 'Anonymous', age = 0 } = person

// console.log(`${firstName} is ${age}`)

// const { city, temp: temperature } = person.location

// if (city && temperature) {
//     console.log(`It's ${temperature} in ${city}.`)
// }

// const book = {
//     title: 'Ego is the Enemy',
//     author: 'Ryan Holiday',
//     publisher: {
//         name: 'Penguin'
//     }
// }

// const { name: publisherName = 'Self-Published' } = book.publisher

// console.log(publisherName)

const address = [
    '123 Main Street',
    'Philadelphia',
    'Pensylvania',
    '19147'
]

const [, city, state = 'New York'] = address;

console.log(`You are in ${address[1]}, ${address[2]}`)
console.log(`You are in ${city}, ${state}`)


const item = ['Coffee (hot)', '$2.00', '$2.50', '$2.75']

const [itemName, , price] = item

console.log(`A medium ${itemName} costs ${price}`)