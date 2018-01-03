modules.define('panel__dislike', ['i-bem-dom'], 
function(provide, bemDom) {

provide(bemDom.declElem('panel', 'dislike',
{
    _onClick() {
        this._emit('dislike');
    }
},
{
    lazyInit: true,
    
    onInit: function() {
        this._domEvents().on('click', this.prototype._onClick); 
    }
}));

});