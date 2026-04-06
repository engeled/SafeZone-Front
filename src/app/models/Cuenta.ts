import { Users } from "./Users";

export class Cuenta{
 idCuenta: number = 0;
  servicioCuenta: string = "";
  nombreCuenta: string = "";
  estadoCuenta: boolean = true;
  fecharegistroCuenta: Date = new Date();
  usuario: Users = new Users();
}