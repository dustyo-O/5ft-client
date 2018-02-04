modules.define('panel__dislike', ['i-bem-dom', 'button'], function(provide, bemDom, Button) {

provide(bemDom.declElem('panel', 'dislike',
{
    _onClick() {
        this._emit('dislike');
    }
},
{
    lazyInit: true,

    onInit: function() {
        this._domEvents(Button).on('click', this.prototype._onClick);
    }
}));

});
