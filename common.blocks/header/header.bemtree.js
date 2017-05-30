block('header').content()(function() {
    const block = this.block,
        menuItems = [
            {
                title: 'Случайный подбор',
                url: '#'
            },
            {
                title: 'Лучшие за все время',
                url: '#'
            },
            {
                title: 'За год',
                url: '#'
            },
            {
                title: 'За месяц',
                url: '#'
            },
            {
                title: 'За неделю',
                url: 'Documentation'
            }
        ];

    return [
        {
            block,
            elem: 'image'
        },
        {
            block,
            elem: 'wrapper',
            mix: { block: 'container' },
            content: {
                block,
                elem: 'panel',
                content: [
                    {
                        block: 'button',
                        mix: { block, elem: 'menu-collapse' },
                    },
                    {
                        block: 'logo',
                        mix: { block, elem: 'logo' }
                    },
                    {
                        block,
                        elem: 'menu',
                        content: [{
                            block: 'navbar',
                            mix: { block, elem: 'navbar' },
                            content: menuItems.map(function(item) {
                                return {
                                    elem: 'item',
                                    url: item.url,
                                    content: item.title
                                }
                            })
                        }, {
                            block: 'navbar',
                            mix: { block, elem: 'navbar' },
                            mods: { align: 'right' },
                            content: [{
                                elem: 'item',
                                url: '#',
                                content: {
                                    block: 'icon',
                                    mix: { block, elem: 'social-icon' },
                                    mods: { glyph: 'twitter' }
                                }
                            }]
                        }]
                    }
                ]
            }
        }
    ];
});
