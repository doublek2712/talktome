const http = require('http');
const socketIo = require('socket.io');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading index.html');
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    }
});

const io = socketIo(server);

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('chat message', (data) => {
        io.emit('chat message', data);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

server.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
