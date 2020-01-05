import { Negociacao } from './Negociacao';
import { Object } from '../interfaces/index';

export class ListaNegociacao implements Object<ListaNegociacao> {

    private _list: Negociacao[] = [];

    adiciona(negociacao: Negociacao): void {
        this._list.push(negociacao);
    }

    /**
     * Não retornar a própria referência para evitar que o array tenha modificações externas
     */
    toList(): Negociacao[] {
        return ([] as Negociacao[]).concat(this._list);
    }

    isEmpty(): Boolean {
        return !(this._list.length > 0);
    }

    toString(): void {
        console.log('-- Custom toString() -- ListaNegociacao');
        console.log(JSON.stringify(this._list));
    }

    equals(negociacoes: ListaNegociacao): boolean {
        return JSON.stringify(this._list) == JSON.stringify(negociacoes.toList());
    }
}