import { Equals } from "./Equals";
import { Imprimivel } from "./Imprimivel";

export interface Object<T> extends Equals<T>, Imprimivel {}