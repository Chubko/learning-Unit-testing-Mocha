const fs =require('fs');
const readCow = (cb) => {
    fs.readFile('cow.txt', 'utf8', cb);
};

module.exports = {
    readCow
};
