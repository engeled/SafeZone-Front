import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Users } from './components/users/users';
import { Usuarioregistrar } from './components/users/usuarioregistrar/usuarioregistrar';
import { Menu } from './components/menu/menu';
import { Cuenta } from './components/cuenta/cuenta';
import { Archivos } from './components/archivos/archivos';
import { Archivoregistrar } from './components/archivos/archivoregistrar/archivoregistrar';
import { Recomendacionregistrar } from './components/recomendacion/recomendacionregistrar/recomendacionregistrar';
import { Recomendacion } from './components/recomendacion/recomendacion';
import { Registrar } from './components/registrar/registrar';
import { BuscarArchivosXFecha } from './components/archivos/buscar-archivos-xfecha/buscar-archivos-xfecha';
import { Alerta } from './components/alerta/alerta';
import { Recurso } from './components/recurso/recurso';
import { Role } from './components/role/role';
import { APIcomponent } from './components/apicomponent/apicomponent';
import { Rollistar } from './components/role/rollistar/rollistar';
import { Rolregistrar } from './components/role/rolregistrar/rolregistrar';
import { Recursobuscar } from './components/recurso/recursobuscar/recursobuscar';
import { Recursolistar } from './components/recurso/recursolistar/recursolistar';
import { Recursoregistrar } from './components/recurso/recursoregistrar/recursoregistrar';
import { Recursoquery1 } from './components/recurso/recursoquery1/recursoquery1';
import { Recursoquery2 } from './components/recurso/recursoquery2/recursoquery2';
import { Alertalistar } from './components/alerta/alertalistar/alertalistar';
import { Alertaregistrar } from './components/alerta/alertaregistrar/alertaregistrar';
import { Alertabuscar } from './components/alerta/alertabuscar/alertabuscar';
import { Alertaquery1 } from './components/alerta/alertaquery1/alertaquery1';
import { Login } from './components/login/login';
import { TotalArchivosXUsuario } from './components/users/total-archivos-xusuario/total-archivos-xusuario';
import { Auditoria } from './components/auditoria/auditoria';
import { CuentaBuscarComponent } from './components/cuenta/cuentabuscar/cuentabuscar';
import { Cuentalistar } from './components/cuenta/cuentalistar/cuentalistar';
import { LogAcceso } from './components/log-acceso/log-acceso';
import { LogAccesoListar } from './components/log-acceso/log-accesolistar/log-accesolistar';
import { LogAccesoBuscarComponent } from './components/log-acceso/logaccesobuscar/logaccesobuscar';
import { LogAccesoRegistrar } from './components/log-acceso/log-accesoregistrar/log-accesoregistrar';
import { TicketReporte } from './components/ticket-reporte/ticket-reporte';
import { Ticketreportelistar } from './components/ticket-reporte/ticketreportelistar/ticketreportelistar';
import { Ticketreporteregistrar } from './components/ticket-reporte/ticketreporteregistrar/ticketreporteregistrar';
import { Contarticketporusuario } from './components/contarticketporusuario/contarticketporusuario';
import { Respuestasoportelistar } from './components/respuesta-soporte/respuestasoportelistar/respuestasoportelistar';
import { Respuestasoporteregistrar } from './components/respuesta-soporte/respuestasoporteregistrar/respuestasoporteregistrar';
import { Cantidadrespuestatickets } from './components/cantidadrespuestatickets/cantidadrespuestatickets';
import { RespuestaSoporte } from './components/respuesta-soporte/respuesta-soporte';
import { AuditoriaListar } from './components/auditoria/auditorialistar/auditorialistar';
import { AuditoriaBuscarComponent } from './components/auditoria/auditoriabuscar/auditoriabuscar';
import { AuditoriaRegistrarComponent } from './components/auditoria/auditoriaregistrar/auditoriaregistrar';
import { BuscarRecomendacionXCategoria } from './components/recomendacion/buscar-recomendacion-xcategoria/buscar-recomendacion-xcategoria';
import { guardseguridadGuard } from './guards/guardseguridad-guard';
import { CuentaRegistrarComponent } from './components/cuenta/cuentaregistrar/cuentaregistrar';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },

  {
    path: 'home',
    component: Home,
  },

  {
    path: 'login',
    component: Login,
  },

  {
    path: 'registrar',
    component: Registrar,
  },

  {
    path: 'menu',
    component: Menu,
    //canActivate: [guardseguridadGuard],
  },

  {
    path: 'usuarios',
    component: Users,
    //canActivate: [guardseguridadGuard],
    children: [
      { path: 'registrar', component: Usuarioregistrar },
      { path: 'actualizar/:id', component: Usuarioregistrar },
      { path: 'totalarchivosXusuario', component: TotalArchivosXUsuario },
    ],
  },
  {
    path: 'archivos',
    component: Archivos,
    //canActivate: [guardseguridadGuard],
    children: [
      { path: 'registrar', component: Archivoregistrar },
      { path: 'actualizar/:id', component: Archivoregistrar },
      { path: 'buscarxfecha', component: BuscarArchivosXFecha },
    ],
  },
  {
    path: 'recomendaciones',
    component: Recomendacion,
    //canActivate: [guardseguridadGuard],
    children: [
      { path: 'registrar', component: Recomendacionregistrar },
      { path: 'actualizar/:id', component: Recomendacionregistrar },
      { path: 'buscarrecomendacionxcatergoria', component: BuscarRecomendacionXCategoria },
    ],
  },

  {
    path: 'alertas',
    component: Alerta,
    //canActivate: [guardseguridadGuard],
    children: [
      { path: 'listar', component: Alertalistar },
      { path: 'registrar', component: Alertaregistrar },
      { path: 'editar/:id', component: Alertaregistrar },
      { path: 'buscar', component: Alertabuscar },
      { path: 'reporte1', component: Alertaquery1 },
    ],
  },

  {
    path: 'recursosducativos',
    component: Recurso,
    //canActivate: [guardseguridadGuard],
    children: [
      { path: 'listar', component: Recursolistar },
      { path: 'registrar', component: Recursoregistrar },
      { path: 'editar/:id', component: Recursoregistrar },
      { path: 'buscar', component: Recursobuscar },
      { path: 'reporte1', component: Recursoquery1 },
      { path: 'reporte2', component: Recursoquery2 },
    ],
  },

  {
    path: 'roles',
    component: Role,
    //canActivate: [guardseguridadGuard],
    children: [
      { path: 'listar', component: Rollistar },
      { path: 'registrar', component: Rolregistrar },
      { path: 'editar/:id', component: Rolregistrar },
    ],
  },

{
    path: 'auditoria',
    component: Auditoria,
    //canActivate: [guardseguridadGuard],
    children: [
      { path: 'listar', component: AuditoriaListar },
      { path: 'buscar', component: AuditoriaBuscarComponent },
      { path: 'registrar', component: AuditoriaRegistrarComponent },
      { path: 'edicion/:id', component: AuditoriaRegistrarComponent },
    ],
  },

  {
    path: 'cuentas',
    component: Cuenta,
    //canActivate: [guardseguridadGuard],
    children: [
      { path: 'listar', component: Cuentalistar },
      { path: 'buscar', component: CuentaBuscarComponent },
      { path: 'registrar', component: CuentaRegistrarComponent },
      { path: 'edicion/:id', component: CuentaRegistrarComponent}
    ],
  },

  {
    path: 'logacceso',
    component: LogAcceso,
    //canActivate: [guardseguridadGuard],
    children: [
      { path: 'listar', component: LogAccesoListar },
      { path: 'registrar', component: LogAccesoRegistrar },
      { path: 'buscar', component: LogAccesoBuscarComponent },
      { path: 'edicion/:id', component: LogAccesoRegistrar },
    ],
  },

  {
    path: 'ticketsoporte',
    component: TicketReporte,
    //canActivate: [guardseguridadGuard],
    children: [
      { path: 'listar', component: Ticketreportelistar },
      { path: 'registrar', component: Ticketreporteregistrar },
      {path: 'edits/:id', component: Ticketreporteregistrar},
    ],
  },

  {
    path: 'contarticketporusuario',
    component: Contarticketporusuario,
    //canActivate: [guardseguridadGuard],
  },

  {
    path: 'respuestasoporte',
    component: RespuestaSoporte,
    //canActivate: [guardseguridadGuard],
    children: [
      { path: 'listar', component: Respuestasoportelistar },
      { path: 'registrar', component: Respuestasoporteregistrar },
      { path: 'edits/:id', component: Respuestasoporteregistrar }
    ],
  },

  {
    path: 'cantidadrespuestaticket',
    component: Cantidadrespuestatickets,
    //canActivate: [guardseguridadGuard],
  },


  {
    path: 'scan',
    component: APIcomponent,
    //canActivate: [guardseguridadGuard],
  },
];
