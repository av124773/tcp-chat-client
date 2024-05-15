const net = require('net')
const port = 4000
const conn = net.createConnection(port)

process.stdin.resume()

conn.on('connect', () => {
    console.log('Connected to server')
})

conn.on('error', (err) => {
    console.log('Error in connection:', err)
})

conn.on('close', () => {
    console.log('Connection got closed')
})

conn.pipe(process.stdout, { end: false })
process.stdin.pipe(conn)
