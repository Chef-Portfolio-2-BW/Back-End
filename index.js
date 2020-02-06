require('dotenv').config()
const server = require('./server.js');

const PORT = process.env.PORT || 5000;

if(!module.parent){
  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });
}

module.exports = server