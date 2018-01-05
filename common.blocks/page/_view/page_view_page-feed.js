modules.define('page', ['BEMHTML', 'i-bem-dom', 'body', 'pager'], function (provide, BEMHTML, bemDom, Body, Pager) {

provide(bemDom.declBlock(this.name,
    {
        onSetMod: {
            js: {
                inited: function () {
                    this._body = this.findChildBlock(Body);
                    this._pager = this.findChildBlock(Pager);
                }
            }
        },

        _onPageRequest(event, page) {
            this._body.loadPage(page);
        },

        _onPageLoaded(event, result) {
            const status = result.status;

            if (status === 'finish') {
                bemDom.replace(this._pager.domElem, BEMHTML.apply(result.message));
            } else {
                this._pager.onPageLoad(status === 'ok');
            }
        }
    },
    {
        lazyInit: true,

        onInit() {
            const ptp = this.prototype;

            this._events(Pager).on('pagerequested', ptp._onPageRequest);
            this._events(Body).on('pageloaded', ptp._onPageLoaded);
        }
    })
);

});
