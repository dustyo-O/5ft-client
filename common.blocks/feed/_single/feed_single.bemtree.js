block('feed').mod('single', true).replace()(function () {
    var data = this.data,
        aneks = data && data.aneks;

    return aneks ? applyNext() : {
            block: 'panel',
            data: {
                content: 'Анекдот не найден'
            }
        };
});
