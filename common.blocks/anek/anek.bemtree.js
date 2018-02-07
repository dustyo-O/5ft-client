block('anek').content()(function() {
    var anek = this.ctx.anek || this.data.anek || {},
        text = anek.text.replace(/[аa]н[еe]кд[оo]т[оo]в\.n[eе]t/g, '');

    return {
        block: 'panel',
        data: {
            id: anek.id,
            content: { html: text },
            rate: anek.rate
        }
    };
});
