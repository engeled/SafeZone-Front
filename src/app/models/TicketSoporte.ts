import { Users } from "./Users"

export class TicketSoporte{
    idSoporte:number=0
    tipoSoporte:string=""
    asuntoSoporte:string=""
    descripcionSoporte:string=""
    estadoSoporte:string=""
    fechacreacionSoporte:Date=new Date()
    usuario:Users=new Users()
}