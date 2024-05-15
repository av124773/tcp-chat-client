const net = require('net')
const port = 4000
let conn = null

const retryInterval = 3000
const maxRetries = 10
let retriedTime = 0

process.stdin.resume()

;(function connect() {
    function reconnect() {
        if (retriedTime >= maxRetries) {
            throw new Error('Max retries have been execcded.')
        }
        retriedTime++
        setTimeout(connect, retryInterval)
        console.log(`Retry ${retriedTime} Times`)
    }

    conn = net.createConnection(port)

    conn.on('connect', () => {
        retriedTime = 0
        console.log('Connected to server\n')
    })
    
    conn.on('error', (err) => {
        console.log('Error in connection:', err)
    })
    
    conn.on('close', () => {
        console.log('Connection got closed\n')
        reconnect()
    })

    conn.pipe(process.stdout, { end: false })
    process.stdin.pipe(conn)
}())
