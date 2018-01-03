modules.define('panel__rating', 
['i-bem-dom', 'panel__like', 'panel__dislike', 'jquery'], 
function(provide, bemDom, panelLike, panelDislike, $) {

provide(bemDom.declElem('panel', 'rating',
{
    onSetMod: {
        js: {
            inited: function() {
                this._label = this._elem('label');
            }
        }
    },

    _like() {
        this._vote('like');
        this.setMod('like');
    },

    _onLike(response) {
        this._label.domElem.text(response.rating);
    },

    _dislike() {
        this._vote('dislike');
    },

    _onDislike(response) {
        this._label.domElem.text(response.rating);
        this.setMod('dislike');
    },

    _vote(type) {
        const params = this.params;
        
        $.ajax({
            url: '/api/' + type + '/' + params.id,
            data: {
                _csrf: params.csrf,
            },
            method: 'POST',
            dataType: 'json',
            success: this['_on' + type.slice(0, 1).toUpperCase() + type.slice(1)],
            context: this
        });
    }
},
{
    lazyInit: true,

    onInit() {
        const ptp = this.prototype;

        this._events(panelLike).on('like', ptp._like);
        this._events(panelDislike).on('dislike', ptp._dislike);
    }
}));

});