import { Negociacao } from "../models/index";
import { HandlerFunction, NegociacaoParcial } from "../interfaces/index";
export class NegociacaoService {

    /**
     * Fetch api retorna uma Promise tipada
     * @param handler 
     */
  obterNegociacoesImportador(handler: HandlerFunction): Promise<Negociacao[]> {
    return fetch("http://localhost:8080/dados")
      .then(res => handler(res))
      .then(res => res.json())
      .then((dados: NegociacaoParcial[]) =>
        dados.map(dado => new Negociacao(new Date(), dado.vezes, dado.montante)))
      .catch(err => {
        throw new Error(err);
      });
  }
}