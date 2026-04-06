import { Users } from "./Users";

export class Auditoria{
idAuditoria: number = 0;
  fechaAuditoria: Date = new Date();
  tipoAuditoria: string = "";
  descripcion: string = "";
  usuario: Users = new Users();
}