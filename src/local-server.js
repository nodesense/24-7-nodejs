//local-server.js
// NO CLUSTER VERSION

const minimist = require('minimist');
const http = require('http');

const app = require('./app'); // index.js is default

const args = minimist(process.argv.slice(2))

const HOST_IP = args.ip || '127.0.0.1'
const PORT = args.port || 8080
const NODE_ENV = process.env.NODE_ENV || 'development'

console.log('Starting server at ', HOST_IP, PORT)
console.log('Running on ', NODE_ENV)

console.log('Creating server **')
const server = http.createServer(app);

server.listen(PORT, HOST_IP, function(error){
    if (!error) {
        console.log('SERVER STARTED')
    }
})

//console.log(process.env);
// console.log(process.argv)
// console.log(args)
