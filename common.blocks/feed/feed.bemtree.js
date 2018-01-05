block('feed').replace()(function() {
    var data = this.data,
        aneks = data ? data.aneks : undefined;

    return aneks ? aneks.map(function(anek) {
        return {
            block: 'anek',
            anek: anek
        }
    }) : {
        block: 'panel',
        data: {
            content: 'Нет больше анекдотов'
        }
    };
});
