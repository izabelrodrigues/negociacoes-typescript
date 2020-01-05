import { Imprimivel } from '../interfaces/index';
export function imprime(...objetos: Imprimivel[]) {
  objetos.forEach(objeto => objeto.toString());
}
