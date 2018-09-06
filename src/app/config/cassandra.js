// config/cassandra.js
const cassandra = require('cassandra-driver');

const config = require('./index'); // config file
console.log('CONFIG ', config);


const cassandraClient = new cassandra.Client({
                    contactPoints: config.cassandra.contactPoints});

module.exports = cassandraClient;