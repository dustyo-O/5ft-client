modules.define('pager', ['i-bem-dom', 'spin'], function (provide, bemDom, Spin) {

    provide(bemDom.declBlock(this.name,
        {
            onSetMod: {
                js: {
                    inited: function () {
                        this._page = 1;
                        this._spin = this.findChildBlock(Spin);

                        this._domEvents(bemDom.win).on('scroll', this._onScroll);
                    }
                }
            },

            _onScroll() {
                if (this._refreshing) return;

                var winHeight = bemDom.win.innerHeight(),
                    pagerPos = this.domElem[0].getBoundingClientRect(),
                    pagerTop = pagerPos.top;

                if (pagerTop < winHeight * 2) {
                    this._refreshing = true;
                    this._spin.setMod('visible');

                    this._emit('pagerequested', this._page);
                }
            },

            onPageLoad(success) {
                if (success) {
                    this._page++;
                }

                this._refreshing = false;
                this._spin.setMod('visible', false);
            }
        },
        {
            lazyInit: false
        })
    );
});
