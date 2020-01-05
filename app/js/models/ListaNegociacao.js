System.register([], function (exports_1, context_1) {
    "use strict";
    var ListaNegociacao;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            ListaNegociacao = class ListaNegociacao {
                constructor() {
                    this._list = [];
                }
                adiciona(negociacao) {
                    this._list.push(negociacao);
                }
                toList() {
                    return [].concat(this._list);
                }
                isEmpty() {
                    return !(this._list.length > 0);
                }
                toString() {
                    console.log('-- Custom toString() -- ListaNegociacao');
                    console.log(JSON.stringify(this._list));
                }
                equals(negociacoes) {
                    return JSON.stringify(this._list) == JSON.stringify(negociacoes.toList());
                }
            };
            exports_1("ListaNegociacao", ListaNegociacao);
        }
    };
});
