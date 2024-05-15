const net = require('net')
const port = 4000
let conn = null
let isQuit = false

const retryInterval = 3000
const maxRetries = 10
let retriedTime = 0

process.stdin.resume()

process.stdin.on('data', (data) => {
    const message = data.toString().trim()
    if (message === '/quit') {
        isQuit = true
        conn.end()
        process.stdin.pause()
        console.log('quitring...')
    } else {
        conn.write(data)
    }
})

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
        if (!isQuit) {
            console.log('Connection got closed\n')
            reconnect()
        }
    })

    conn.pipe(process.stdout, { end: false })
}())
