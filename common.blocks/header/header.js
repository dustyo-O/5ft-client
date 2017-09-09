modules.define('header', ['i-bem-dom'], function(provide, bemDom) {

provide(bemDom.declBlock(this.name,
{
    onSetMod: {
        js: {
            inited: function() {
                this._domEvents(bemDom.win).on('scroll', this._onScroll);
            }
        }
    },

    _onScroll() {
        var top = bemDom.win.scrollTop(),
            $image = this.findChildElem('image').domElem;

        if (top < 180) {
            var delta = 1 - top / 180;

            $image.css({ opacity: delta });
            $image.show();
            this.delMod('fixed');
        } else {
            $image.css({ opacity: 0 });
            $image.hide();
            this.setMod('fixed');            
        }
    }
},
{
    lazyInit: false
}));

});