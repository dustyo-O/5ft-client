const enableStubs = process.env.CI || process.env.STUBS,
    stub = require('./stub'),
    Model = require('./model');

module.exports = {
    aneks: function (req, res, data) {
        const page = Number(data && data.page);

        return enableStubs ? stub('aneks-' + page + '.json', res) :
            Model.aneks({ page: page });
    },
    anek: function (req, res, data) {
        const id = Number(data && data.id);

        return enableStubs ? stub('anek-' + id + '.json', res) :
            Model.anek({ id: id });
    },
    like: function (req, res, params) {
        return enableStubs ? stub('like.json', res) :
            Model.like(params.anek);
    },
    dislike: function (req, res, params) {
        return enableStubs ? stub('dislike.json', res) :
            Model.dislike(params.anek);
    }
};
