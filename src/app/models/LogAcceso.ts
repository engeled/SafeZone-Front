import { Users } from "./Users";

export class LogAcceso{
idLogAcceso: number = 0;
  fechaAcceso: Date = new Date();
  ipAcceso: string = "";
  navegadorAcceso: string = "";
  sistemaoperativoAcceso: string = "";
  usuario: Users = new Users();
}