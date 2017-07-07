block('page').mod('view', 'page-feed').content()(function() {
    return [
        {
            block: 'header'
        },
        {
            block: 'body',
            content: {
                block: 'feed'
            }
        },
        {
            block: 'footer'
        }
    ];
});
