const app = require('../index');
const http = require('http');

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Server running at port ${port}`);
});