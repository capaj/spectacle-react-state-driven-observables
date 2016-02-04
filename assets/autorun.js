const mobservable = require('mobservable')
var observable = mobservable.observable
const autorun = mobservable.autorun

const numbers = observable([1, 2])
const numbers2 = observable([4, 5])
// observable = (a) => a

const sum1 = observable(() => {
  console.log('1 runs')
  return numbers.reduce((a, b) => a + b, 0)
})
const sum2 = observable(() => {
  console.log('2 runs')
  return numbers2.reduce((a, b) => a + b, 0)
})

const disposer = autorun(() => console.log(`sum: ${sum1()}, sum2: ${sum2()} at time: ${new Date()*1}`))  // will run or not?

// mobservable.transaction(() => {
  // numbers.push(3)
  // numbers2.push(6)
// })

disposer()
numbers.push(5)
