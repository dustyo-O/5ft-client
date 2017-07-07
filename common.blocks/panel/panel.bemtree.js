block('panel').content()(function() {
    var data = this.ctx.data || this.data.data || {},
        content = data.content,
        rating = data.rating,
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
        rating !== undefined && {
            elem: 'rating',
            mods: rating !== 0 && {
                 positive: rating > 0 ? 'yes' : 'no'
            },
            rating: rating
        }
    ];
});
