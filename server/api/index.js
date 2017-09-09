var stub = require('./stub');

module.exports = {
    aneks: function(req, res) {
        return stub('aneks.json', res);
    }
};