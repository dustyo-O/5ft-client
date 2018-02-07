block('header').content()(function() {
    const block = this.block,
        menuItems = [
            {
                title: 'Случайный подбор',
                url: '/random'
            },
            {
                title: 'Лучшие за все время',
                url: '/bestaneks/p/1'
            },
            {
                title: 'За год',
                url: '/bestyear/p/1'
            },
            {
                title: 'За месяц',
                url: '/bestmonth/p/1'
            },
            {
                title: 'За неделю',
                url: '/bestweek/p/1'
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
