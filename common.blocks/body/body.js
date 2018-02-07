modules.define('body', ['BEMHTML', 'i-bem-dom', 'jquery'], function (provide, BEMHTML, bemDom, $) {

provide(bemDom.declBlock(this.name,
    {
        onSetMod: {
            js: {
                inited: function () {
                    /*borschik:include:../../node_modules/bricks.js/dist/bricks.js*/

                    this.layout = new this.Bricks({
                        container: '.body',
                        packed: 'data-packed',
                        sizes: [
                            { columns: 1, gutter: 0 },
                            { mq: '768px', columns: 2, gutter: 30 }
                        ]
                    });

                    this.layout.pack();
                }
            }
        },

        loadPage(page) {
            $.ajax({
                url: '/' + (this.params.page ? this.params.page + '/' : '') + 'p/' + (page + 1) + '/',
                context: this,
                cache: false,
                dataType: 'json'
            })
            .done(function (json) {
                const aneksLoaded = json.length > 0; // если пришел массив анекдотов - загрузка успешная
                if (aneksLoaded) {
                    bemDom.append(this.domElem, BEMHTML.apply(json));
                }
                this.pack();

                this._emit('pageloaded', {
                    status: aneksLoaded ? 'ok' : 'finish',
                    message: !aneksLoaded && json
                });
            })
            .fail(function () {
                this._emit('pageloaded', { status: 'error' });
            });
        },

        pack() {
            this.layout.update();
        }
    },
    {
        lazyInit: false
    })
);

});
