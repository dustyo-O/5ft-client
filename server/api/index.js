var stub = require('./stub');

module.exports = {
    aneks: function(req, res, data) {
        const page = Number(data && data.page);

        return stub('aneks-' + page + '.json', res);
    },
    anek: function (req, res, data) {
        const id = Number(data && data.id);

        return stub('anek-' + id + '.json', res);
    },
    like: function(req, res) {
        return stub('like.json', res);
    },
    dislike: function(req, res) {
        return stub('dislike.json', res);
    }
};
