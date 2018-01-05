var stub = require('./stub');

module.exports = {
    aneks: function(req, res, data) {
        const page = data && data.page;

        return stub('aneks-' + page + '.json', res);
    },
    like: function(req, res) {
        return stub('like.json', res);
    },
    dislike: function(req, res) {
        return stub('dislike.json', res);
    }
};
