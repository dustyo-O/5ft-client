block('panel').elem('rating')(
    def()(function() {
        return Object.assign(applyNext(), { js: { csrf: this.data.csrf } });
    }),
    content()(function() {
        var block = this.block;
        return [
            {
                block: 'button',
                mods: { view: 'plain' },
                mix: { block: block, elem: 'like', js: true },
                content: [
                    { block: 'icon', mods: { glyph: 'heart' } },
                    { block: 'icon', mods: { glyph: 'heart-o' } }
                ]
            },
            {
                block: 'label',
                mix: { block: block, elem: 'label' },
                content: this.ctx.rate
            },
            {
                block: 'button',
                mods: { view: 'plain' },
                mix: { block: block, elem: 'dislike', js: true }
            }
        ];
    })
);
