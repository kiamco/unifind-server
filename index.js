import Server from './api/server.js';

const port = process.env.PORT || 3000;

// listen to server 
Server.listen(port, () => console.log(`\n** Running on port ${port} **\n`));

