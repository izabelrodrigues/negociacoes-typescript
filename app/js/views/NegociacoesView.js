System.register(["./ViewBase"], function (exports_1, context_1) {
    "use strict";
    var ViewBase_1, NegociacoesView;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (ViewBase_1_1) {
                ViewBase_1 = ViewBase_1_1;
            }
        ],
        execute: function () {
            NegociacoesView = class NegociacoesView extends ViewBase_1.ViewBase {
                template(model, typeMsg) {
                    if (model.isEmpty()) {
                        return `<p class="alert alert-warning">Não há negociações cadastradas!</p>`;
                    }
                    return `
        <table class="table table-hover table-bordered">
            <thead>
                <tr>
                    <th>DATA</th>
                    <th>QUANTIDADE</th>
                    <th>VALOR</th>
                    <th>VOLUME</th>
                </tr>
            </thead>

            <tbody>
            </tbody>
            ${model
                        .toList()
                        .map(negociacao => `
                    <tr>
                        <td>${negociacao.data.getDate()}/${negociacao.data.getMonth() +
                        1}/${negociacao.data.getFullYear()}</td>
                        <td>${negociacao.quantidade}</td>
                        <td>${negociacao.valor}</td>
                        <td>${negociacao.volume}</td>
                    </tr>                        
                `)
                        .join("")}        
            <tfoot>
            </tfoot>
        </table>               
        `;
                }
            };
            exports_1("NegociacoesView", NegociacoesView);
        }
    };
});
