block('panel').elem('number').content()(function() {
    var id = this.ctx.id;

    return {
        block: 'link',
        mix: { block: 'material' },
        content: '#' + id,
        url: '/a/' + id
    };
});