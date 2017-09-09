block('anek').content()(function() {
    var anek = this.ctx.anek || this.data.anek || {};
    
    return {
        block: 'panel',
        data: {
            id: anek.id,
            content: anek.text,
            rating: anek.rating 
        }
    };
});
