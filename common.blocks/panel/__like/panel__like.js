modules.define('panel__like', ['i-bem-dom', 'button'], function(provide, bemDom, Button) {

provide(bemDom.declElem('panel', 'like',
{
    _onClick() {
        this._emit('like');
    }
},
{
    lazyInit: true,

    onInit: function() {
        this._domEvents(Button).on('click', this.prototype._onClick);
    }
}));

});
