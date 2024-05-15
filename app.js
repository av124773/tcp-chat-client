const net = require('net')
const port = 4000
const conn = net.createConnection()

conn.on('connect', () => {
    console.log('connected to server')
})

conn.on('error', (err) => {
    console.log('Error in connection:', err)
})
