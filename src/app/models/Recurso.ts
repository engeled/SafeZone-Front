import { Users } from "./Users";

export class Recurso {
  idRecurso: number = 0;
  tituloRecurso: string = "";
  descripcionRecurso: string = "";
  tipoRecurso: string = "";
  nivelRecurso: string = "";
  urlRecurso: string = "";
  usuario: Users = new Users();
}
