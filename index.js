const http = require('http')
const path = require('path')
const fs = require('fs')

const PORT = process.env.PORT || 3000

const server = http.createServer((request, response) => {
    let file = path.join(__dirname, 'public', request.url === '/' ? 'index.html' : request.url)

    const ext = path.extname(file)
    let contentType = 'text/html'

    switch(ext) {
        case '.css':
            contentType = 'text/css'
            break
        case '.js':
            contentType = 'text/javascript'
            break
        default:
            contentType = 'text/html'
    }

    if(!ext) {
        file += '.html' 
    }

    fs.readFile(file, (err, data) => {
        if(err) {
            fs.readFile(path.join(__dirname, 'public', 'error.html'), (err, info) => {
                if (err) {
                    response.writeHead(500)
                    response.end('Error 500')
                } else {
                    response.writeHead(200, {
                        'Content-Type': 'text/html'
                    })
                    response.end(info)
                }
            })
        } else {
            response.writeHead(200, {
                'Content-Type': 'text/html'
            })
            response.end(data)
        }
    })

})

server.listen(PORT, () => console.log('Server has been started...'))