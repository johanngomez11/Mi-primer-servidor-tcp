const net = require('net');
const readline = require('readline');

const client = new net.Socket();
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

client.connect(5000, '127.0.0.1', () => {
    console.log("Conexión exitosa");
    rl.addListener('line', line => {
        client.write(line);
    });
});

client.on('close', () => {
    console.log("Conexión terminada");
    rl.close();
});

client.on('data', (data) => {
    console.log(`INFO: ${data}`);
});
