import { Object } from "../interfaces/index";

export class Negociacao  implements Object<Negociacao> {

    /* 1 - Forma de escrever atributos privados em que somente a classe tem acesso
    constructor(private _data: Date, private _quantidade: number, private _valor:number) {}

    get data() {
        return this._data;
    }
    get quantidade() {
        return this._quantidade;
    }
    get valor() {
        return this._valor;
    }     

    get volume() {
        return this._quantidade * this._valor;
    }*/

    /**
     * Usando readonly para depois de criados , os atributos não possam ser modificados
     * @param data 
     * @param quantidade 
     * @param valor 
     */
    constructor(readonly data: Date, readonly quantidade: number, readonly valor:number) {
    }

    get volume() {
        return this.quantidade * this.valor;
    }

    toString(): void {
        console.log('-- Custom toString() -- Negociacao');
        console.log(
            `Data: ${this.data}
            Quantidade: ${this.quantidade}, 
            Valor: ${this.valor}, 
            Volume: ${this.volume}`);
    }

    equals(negociacao: Negociacao): boolean {

        return this.data.getDate() == negociacao.data.getDate()
            && this.data.getMonth() == negociacao.data.getMonth() 
            && this.data.getFullYear() == negociacao.data.getFullYear();
    }

}