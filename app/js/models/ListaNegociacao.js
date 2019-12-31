class ListaNegociacao {
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
}
