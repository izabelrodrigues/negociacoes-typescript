class MensagemView extends ViewBase<string> {
  template(model: string): string {
    return `
    <p class='alert alert-info'>${model}</p.       
    `;
  }
}
