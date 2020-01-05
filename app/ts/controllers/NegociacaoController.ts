/**
 * Importando usando a técnica do barril
 */
import { ListaNegociacao, Negociacao } from "../models/index";
import { NegociacoesView, MensagemView } from "../views/index";
import { domInject, throttle } from "../helpers/decorators/index";
import { NegociacaoService } from "../services/index";
import { imprime } from "../helpers/Utils";

export class NegociacaoController {
  @domInject("#data")
  private _inputData: JQuery;
  @domInject("#quantidade")
  private _inputQuantidade: JQuery;
  @domInject("#valor")
  private _inputValor: JQuery;
  private _negociacoes = new ListaNegociacao();
  private _negociacoesView = new NegociacoesView("#negociacoesView");
  private _mensagemView = new MensagemView("#mensagemView");
  private _negociacaoService = new NegociacaoService();

  /* sem jquery. lembrando que no caso as propriedades teriam que estar como HtmlInputElement
  constructor() {
    this._inputData = document.querySelector("#data");
    this._inputQuantidade = document.querySelector("#quantidade");
    this._inputValor = document.querySelector("#valor");
    this._negociacoesView.update(this._negociacoes);
  } */

  constructor() {
    this._negociacoesView.update(this._negociacoes);
  }

  @throttle()
  adiciona() {
    let dataNegociacao = new Date(
      this._trataInput(this._inputData).replace(/-/g, "/")
    );
    if (!this._ehDiaUtil(dataNegociacao)) {
      this._mensagemView.update(
        "Negociação não permitida aos finais de semana!"
      );
      return;
    }

    const negociacao = new Negociacao(
      dataNegociacao,
      parseInt(this._trataInput(this._inputQuantidade)),
      parseFloat(this._trataInput(this._inputValor))
    );

    this._negociacoes.adiciona(negociacao);
    imprime(negociacao, this._negociacoes);
    this._negociacoesView.update(this._negociacoes);
    this._mensagemView.update("Negociação adicionada com sucesso!");
  }

  /**
   * Todo código que retorna uma promise, podemos executar dentro de um async await ( recurso do ecmascript 8 )
   */
  @throttle()
  async importar() {
    function isOK(res: Response) {
      if (res.ok) {
        return res;
      } else {
        throw new Error(res.statusText);
      }
    }

    this._mensagemView.update("");

    try {
      const negociacoesParaImportar = await this._negociacaoService.obterNegociacoesImportador(
        isOK
      );
      const negociacoesJaImportadas = this._negociacoes.toList();
      const tamanhoAnterior = this._negociacoes.toList().length;

      negociacoesParaImportar
        .filter(
          negociacaoParaImportar =>
            !negociacoesJaImportadas.some(jaImportada =>
              negociacaoParaImportar.equals(jaImportada)
            )
        )
        .forEach(negociacaoParaImportar => {
          this._negociacoes.adiciona(negociacaoParaImportar);
        });

      this._negociacoesView.update(this._negociacoes);
      const tamanhoFinal = this._negociacoes.toList().length;
      if (tamanhoFinal > tamanhoAnterior) {
        this._mensagemView.update("Negociações importadas com sucesso!");
      }
    } catch (error) {
      console.log(error.message);
      this._mensagemView.update(
        "Não foi possível importar as negociações!",
        "danger"
      );
    }
  }

  /**
   * Trata as possíveis entradas undefided para os campos de input
   * e que não são aceitas pelo compilador
   * @param inputElement
   */
  private _trataInput(inputElement: JQuery): string {
    let valorInput = inputElement.val()?.toString();
    valorInput = valorInput == undefined ? "" : valorInput;
    return valorInput;
  }

  private _ehDiaUtil(data: Date): boolean {
    return (
      data.getDay() != DiaDaSemana.DOMINGO &&
      data.getDay() != DiaDaSemana.SABADO
    );
  }
}

enum DiaDaSemana {
  DOMINGO,
  SEGUNDA,
  TERCA,
  QUARTA,
  QUINTA,
  SEXTA,
  SABADO
}
