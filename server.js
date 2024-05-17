const net = require('net');

const clients = [];

const server = net.createServer((con) => {
    clients.push(con);
    con.write("Servidor iniciado correctamente");
    console.log("Recibí una conexión remota");

    con.on('data', (data) => {
        console.log(`Mensaje recibido del cliente: ${data}`);
        for (let client of clients) {
            if (client !== con) {
                client.write(data);
            }
        }
    });

    con.on('end', () => {
        clients.splice(clients.indexOf(con), 1);
        console.log("Conexión terminada");
    });
});

server.listen(5000, '127.0.0.1', () => {
    console.log('Servidor iniciado correctamente en el puerto 5000');
});
