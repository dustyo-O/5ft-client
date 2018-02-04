block('panel').content()(function() {
    var data = this.ctx.data || this.data.data || {},
        content = data.content,
        rate = data.rate,
        id = data.id;

    return [
        {
            elem: 'panel-content',
            content: content
        },
        id && {
            elem: 'number',
            id: id
        },
        rate !== undefined && {
            elem: 'rating',
            mods: rate !== 0 && {
                 positive: rate > 0 ? 'yes' : 'no'
            },
            id: id,
            rate: rate
        }
    ];
});
