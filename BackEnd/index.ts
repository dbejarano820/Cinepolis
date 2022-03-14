import App from './app';
import * as  http from 'http'

const port = 5000;

App.set('port', port);
const server = http.createServer(App);
server.listen(port);


server.on('listening', () => {
    const addr = server.address();
    const bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
});

module.exports = App;