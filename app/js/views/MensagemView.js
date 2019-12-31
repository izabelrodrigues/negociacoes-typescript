class MensagemView extends ViewBase {
    template(model) {
        return `
    <p class='alert alert-info'>${model}</p.       
    `;
    }
}
