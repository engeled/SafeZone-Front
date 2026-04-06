import { Users } from './Users';
export class Recomendacion {
    idRecomendacion: number = 0;
    tituloRecomendacion: string = '';
    descripcionRecomendacion: string = '';
    categoriaRecomendacion: string = '';
    usuario: Users = new Users();
}
