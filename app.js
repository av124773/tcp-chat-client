const net = require('net')
const port = 4000
let conn = null
let isQuit = false

const retryInterval = 3000
const maxRetries = 10
let retriedTime = 0

process.stdin.resume()
process.stdin.on('data', handleUserInput)

function handleUserInput(data) {
    const message = data.toString().trim()
    if (message === '/quit') {
        quitConnection()
    } else {
        conn.write(data)
    }
}

function quitConnection() {
    isQuit = true
    conn.end()
    process.stdin.pause()
    console.log('Quitting...')
}

function connect() {
    conn = net.createConnection(port)

    conn.on('connect', onConnect)
    conn.on('error', onError)
    conn.on('close', onClose)

    conn.pipe(process.stdout, { end: false })
}

function reconnect() {
    if (retriedTime >= maxRetries) {
        throw new Error('Max retries have been execcded.')
    }
    retriedTime++
    setTimeout(connect, retryInterval)
    console.log(`Retry ${retriedTime} Times`)
}

function onConnect() {
    retriedTime = 0
    console.log('Connected to server\n')
}

function onError(err) {
    console.log('Error in connection:', err)
}

function onClose() {
    if (!isQuit) {
        console.log('Connection got closed\n')
        reconnect()
    }
}

connect()
