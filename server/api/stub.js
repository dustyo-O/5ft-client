fs = require('fs');

/**
 * Читает файл стаба. Отправляет его в express response, если он предоставлен
 * @returns {String} содержимое стаба
 * @param {*} fileName {String}
 * @param {*} res {express response}
 */
function stub(fileName, res) {
    var data;

    try {
        data = fs.readFileSync('./server/api/stubs/' + fileName, 'utf-8');
    } catch (error) {
        return undefined;
    }

    if (res) {
        res.setHeader('Content-Type', 'application/json');
        res.send(data);
    }

    return JSON.parse(data);
}

module.exports = stub;
