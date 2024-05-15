const net = require('net')
const port = 4000
const conn = net.createConnection()

conn.on('connect', () => {
    console.log('Connected to server')
})

conn.on('error', (err) => {
    console.log('Error in connection:', err)
})

conn.on('close', () => {
    console.log('Connection got closed')
})