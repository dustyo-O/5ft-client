block('navbar').content()(function() {
    const block = this.block;
    return [
        {
            block,
            elem: 'image'
        },
        {
            block,
            elem: 'wrapper',
            mix: 'container'
        }
    ];
});
