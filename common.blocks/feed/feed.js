modules.define('feed', ['i-bem-dom'], function(provide, bemDom) {

provide(bemDom.declBlock(this.name,
{
    onSetMod: {
        js: {
            inited: function() { 
                /*borschik:include:../../node_modules/bricks.js/dist/bricks.js*/

                var layout = new this.Bricks({
                    container: '.feed',
                    packed: 'data-packed',
                    sizes: [{ columns: 2, gutter: 30 }]
                });

                layout.pack();
            } 
        }
    },
},
{
    lazyInit: false
}));

});