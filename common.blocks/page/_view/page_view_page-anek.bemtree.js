block('page').mod('view', 'page-anek').content()(function () {
    return [
        {
            block: 'header'
        },
        {
            block: 'body',
            content: {
                block: 'feed',
                mods: { single: true }
            }
        },
        {
            block: 'footer'
        }
    ];
});
