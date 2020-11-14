import Server from './api/server';

const port = process.env.PORT || 8000;

// listen to server 
Server.listen(port, () => console.log(`\n** Running on port ${port} **\n`));

