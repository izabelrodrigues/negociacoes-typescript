class ListaNegociacao {
    private _list: Negociacao[] = [];

    adiciona(negociacao: Negociacao): void {
        this._list.push(negociacao);
    }

    /**
     * Não retornar a própria referência para evitar que o array tenha modificações externas
     */
    toList(): Negociacao[] {
        return [].concat(this._list);
    }

    isEmpty(): Boolean {
        return !(this._list.length > 0);
    }
}