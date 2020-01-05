import { ViewBase } from './ViewBase';

export class MensagemView extends ViewBase<string> {
  template(model: string, typeMsg: string): string {
    if(model.length > 0){
      return `
      <p class='alert alert-${typeMsg}'>${model}</p.       
      `;
    }
    return '';
    
  }
}
