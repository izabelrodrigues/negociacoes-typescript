import { logarTempoDeExecucao } from "../helpers/decorators/index";

export abstract class ViewBase<T> {
  private _elemento: JQuery;
  private _escapar: boolean;

  /**
   * escapar?: boolean faz com que o valor seja undefined por padrão senão passado
   * @param seletor 
   * @param escapar - 
   */
  constructor(seletor: string, escapar: boolean = false) {
    this._elemento = $(seletor);
    this._escapar = escapar;
  }

  @logarTempoDeExecucao(true)
  update(model: T, typeMsg = 'info'): void {
    let template = this.template(model, typeMsg);
        if(this._escapar) {
            template = template.replace(/<script>[\s\S]*?<\/script>/, '');
        }

        this._elemento.html(template);
    
  }

  abstract template(model: T, typeMsg: string): string;
}
