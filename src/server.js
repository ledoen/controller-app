const net = require('net');

function startServer() {
    const server = net.createServer((socket) => {
        socket.on('data', (data) => {
            server.emit('data', data);
        });
    });

    server.listen(8080, () => {
        console.log('Server started on port 8080');
    });

    return server;
}

module.exports = { startServer };