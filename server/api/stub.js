fs = require('fs');

/**
 * Читает файл стаба. Отправляет его в express response, если он предоставлен
 * @returns {String} содержимое стаба
 * @param {*} fileName {String}
 * @param {*} res {express response}
 */
function stub(fileName, res) {
    return new Promise(function(resolve, reject) {
        fs.readFile('./server/api/stubs/' + fileName, 'utf-8', function (error, data) {

            if (error) {
                resolve(undefined);
            }

            if (res) {
                res.setHeader('Content-Type', 'application/json');
                res.send(data);
                resolve(res);
            }

            resolve(data && JSON.parse(data));
        });
    });
}

module.exports = stub;
