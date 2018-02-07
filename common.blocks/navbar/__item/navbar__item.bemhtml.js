block('navbar').elem('item').replace()(function() {
    const { url, content } = this.ctx;
    return {
        block: 'link',
        url,
        mix: {
            block: 'navbar',
            elem: 'item'
        },
        content
    }
});
