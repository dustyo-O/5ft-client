fs = require('fs');

/**
 * Читает файл стаба. Отправляет его в express response, если он предоставлен
 * @returns {String} содержимое стаба
 * @param {*} fileName {String}
 * @param {*} res {express response}
 */
function stub(fileName, res) {
    var data = fs.readFileSync('./server/api/stubs/' + fileName, 'utf-8');

    if (res) {
        res.setHeader('Content-Type', 'application/json');
        res.send(data);
    }

    return JSON.parse(data);
}

module.exports = stub;