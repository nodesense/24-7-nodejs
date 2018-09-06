// config/index.js
const jsonfile = require('jsonfile')
const path = require('path');

const NODE_ENV = process.env.NODE_ENV || 'development'

const filePath = path.join(__dirname, 
                          '../../..', 
                          'environments',
                          NODE_ENV + '.json')

const config = jsonfile.readFileSync(filePath)

module.exports = config;