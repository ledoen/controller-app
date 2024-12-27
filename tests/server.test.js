const net = require('net');
const { startServer } = require('../src/server');

describe('startServer', () => {
    test('should start a server and receive data', (done) => {
        const server = startServer();
        const client = new net.Socket();

        client.connect(8080, 'localhost', () => {
            client.write('25.5');
        });

        server.on('data', (data) => {
            expect(data.toString()).toBe('25.5');
            client.destroy();
            server.close(done);
        });
    });
});