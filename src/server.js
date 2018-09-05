const minimist = require('minimist');

const args = minimist(process.argv.slice(2))

const HOST_IP = args.ip || '127.0.0.1'
const PORT = args.port || 8080
const NODE_ENV = process.env.NODE_ENV || 'development'

console.log('Starting server at ', HOST_IP, PORT)
console.log('Running on ', NODE_ENV)

//console.log(process.env);

// console.log(process.argv)
// console.log(args)
