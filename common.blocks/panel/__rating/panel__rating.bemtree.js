block('panel').elem('rating').content()(function() {
    var block = this.block;
    return [
        {
            block: 'button',
            mods: { view: 'plain' },
            icon: { block: 'icon', mods: { glyph: 'heart-o' }}
        },
        this.ctx.rating,
        {
            block: 'button',
            mods: { view: 'plain' },
            mix: { block: block, elem: 'dislike' }
        }
    ];
});