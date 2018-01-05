block('pager')(
    addJs()(true),

    content() (function() {
        return {
            block: 'spin',
            mods: {
                theme: 'islands',
                size: 'xl',
                visible: false
            }
        }
    })
);
