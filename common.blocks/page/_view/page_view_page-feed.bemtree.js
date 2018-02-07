block('page').mod('view', 'page-feed').content()(function() {
    return [
        {
            block: 'header'
        },
        {
            block: 'body',
            js: {
                page: this.data.page
            },
            content: {
                block: 'feed'
            }
        },
        {
            block: 'pager'
        },
        {
            block: 'footer'
        }
    ];
});
