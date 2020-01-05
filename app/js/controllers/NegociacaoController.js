System.register(["../models/index", "../views/index", "../helpers/decorators/index", "../services/index", "../helpers/Utils"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var index_1, index_2, index_3, index_4, Utils_1, NegociacaoController, DiaDaSemana;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (index_1_1) {
                index_1 = index_1_1;
            },
            function (index_2_1) {
                index_2 = index_2_1;
            },
            function (index_3_1) {
                index_3 = index_3_1;
            },
            function (index_4_1) {
                index_4 = index_4_1;
            },
            function (Utils_1_1) {
                Utils_1 = Utils_1_1;
            }
        ],
        execute: function () {
            NegociacaoController = class NegociacaoController {
                constructor() {
                    this._negociacoes = new index_1.ListaNegociacao();
                    this._negociacoesView = new index_2.NegociacoesView("#negociacoesView");
                    this._mensagemView = new index_2.MensagemView("#mensagemView");
                    this._negociacaoService = new index_4.NegociacaoService();
                    this._negociacoesView.update(this._negociacoes);
                }
                adiciona() {
                    let dataNegociacao = new Date(this._trataInput(this._inputData).replace(/-/g, "/"));
                    if (!this._ehDiaUtil(dataNegociacao)) {
                        this._mensagemView.update("Negociação não permitida aos finais de semana!");
                        return;
                    }
                    const negociacao = new index_1.Negociacao(dataNegociacao, parseInt(this._trataInput(this._inputQuantidade)), parseFloat(this._trataInput(this._inputValor)));
                    this._negociacoes.adiciona(negociacao);
                    Utils_1.imprime(negociacao, this._negociacoes);
                    this._negociacoesView.update(this._negociacoes);
                    this._mensagemView.update("Negociação adicionada com sucesso!");
                }
                importar() {
                    return __awaiter(this, void 0, void 0, function* () {
                        function isOK(res) {
                            if (res.ok) {
                                return res;
                            }
                            else {
                                throw new Error(res.statusText);
                            }
                        }
                        this._mensagemView.update("");
                        try {
                            const negociacoesParaImportar = yield this._negociacaoService.obterNegociacoesImportador(isOK);
                            const negociacoesJaImportadas = this._negociacoes.toList();
                            const tamanhoAnterior = this._negociacoes.toList().length;
                            negociacoesParaImportar
                                .filter(negociacaoParaImportar => !negociacoesJaImportadas.some(jaImportada => negociacaoParaImportar.equals(jaImportada)))
                                .forEach(negociacaoParaImportar => {
                                this._negociacoes.adiciona(negociacaoParaImportar);
                            });
                            this._negociacoesView.update(this._negociacoes);
                            const tamanhoFinal = this._negociacoes.toList().length;
                            if (tamanhoFinal > tamanhoAnterior) {
                                this._mensagemView.update("Negociações importadas com sucesso!");
                            }
                        }
                        catch (error) {
                            console.log(error.message);
                            this._mensagemView.update("Não foi possível importar as negociações!", "danger");
                        }
                    });
                }
                _trataInput(inputElement) {
                    var _a;
                    let valorInput = (_a = inputElement.val()) === null || _a === void 0 ? void 0 : _a.toString();
                    valorInput = valorInput == undefined ? "" : valorInput;
                    return valorInput;
                }
                _ehDiaUtil(data) {
                    return (data.getDay() != DiaDaSemana.DOMINGO &&
                        data.getDay() != DiaDaSemana.SABADO);
                }
            };
            __decorate([
                index_3.domInject("#data")
            ], NegociacaoController.prototype, "_inputData", void 0);
            __decorate([
                index_3.domInject("#quantidade")
            ], NegociacaoController.prototype, "_inputQuantidade", void 0);
            __decorate([
                index_3.domInject("#valor")
            ], NegociacaoController.prototype, "_inputValor", void 0);
            __decorate([
                index_3.throttle()
            ], NegociacaoController.prototype, "adiciona", null);
            __decorate([
                index_3.throttle()
            ], NegociacaoController.prototype, "importar", null);
            exports_1("NegociacaoController", NegociacaoController);
            (function (DiaDaSemana) {
                DiaDaSemana[DiaDaSemana["DOMINGO"] = 0] = "DOMINGO";
                DiaDaSemana[DiaDaSemana["SEGUNDA"] = 1] = "SEGUNDA";
                DiaDaSemana[DiaDaSemana["TERCA"] = 2] = "TERCA";
                DiaDaSemana[DiaDaSemana["QUARTA"] = 3] = "QUARTA";
                DiaDaSemana[DiaDaSemana["QUINTA"] = 4] = "QUINTA";
                DiaDaSemana[DiaDaSemana["SEXTA"] = 5] = "SEXTA";
                DiaDaSemana[DiaDaSemana["SABADO"] = 6] = "SABADO";
            })(DiaDaSemana || (DiaDaSemana = {}));
        }
    };
});
