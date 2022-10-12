import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'mainconductor',
    pathMatch: 'full'
  },
  {
    path: 'inicio-sesion',
    loadChildren: () => import('./pages/inicio-sesion/inicio-sesion.module').then( m => m.InicioSesionPageModule)
  },
  {
    path: 'registrarse',
    loadChildren: () => import('./pages/registrarse/registrarse.module').then( m => m.RegistrarsePageModule)
  },
  {
    path: 'miperfil',
    loadChildren: () => import('./pages/miperfil/miperfil.module').then(m => m.MiperfilPageModule)
  },  
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'configuracion',
    loadChildren: () => import('./pages/configuracion/configuracion.module').then( m => m.ConfiguracionPageModule)
  },
  {
    path: 'tomarauto',
    loadChildren: () => import('./pages/tomarauto/tomarauto.module').then( m => m.TomarautoPageModule)
  },
  {
    path: 'registrarauto',
    loadChildren: () => import('./pages/registrarauto/registrarauto.module').then( m => m.RegistrarautoPageModule)
  },
  {
    path: 'viajeactivo',
    loadChildren: () => import('./pages/viajeactivo/viajeactivo.module').then( m => m.ViajeactivoPageModule)
  },
  {
    path: 'mainconductor',
    loadChildren: () => import('./pages/mainconductor/mainconductor.module').then( m => m.MainconductorPageModule)
  },
  {
    path: 'tabconductor',
    loadChildren: () => import('./pages/tabconductor/tabconductor.module').then( m => m.TabconductorPageModule)
  },
  {
    path: 'formv',
    loadChildren: () => import('./pages/formv/formv.module').then( m => m.FormvPageModule)
  },
  {
    path: 'viajeactivo-cond',
    loadChildren: () => import('./pages/viajeactivo-cond/viajeactivo-cond.module').then( m => m.ViajeactivoCondPageModule)
  },
  {
    path: 'recuperarpass',
    loadChildren: () => import('./pages/recuperarpass/recuperarpass.module').then( m => m.RecuperarpassPageModule)
  },
  {
    path: 'billetera',
    loadChildren: () => import('./pages/billetera/billetera.module').then( m => m.BilleteraPageModule)
  },
  {
    path: 'configuracion-conductor',
    loadChildren: () => import('./pages/configuracion-conductor/configuracion-conductor.module').then( m => m.ConfiguracionConductorPageModule)
  },
  {
    path: 'carga',
    loadChildren: () => import('./pages/carga/carga.module').then( m => m.CargaPageModule)
  },
  {
    path: 'configuracion-auto',
    loadChildren: () => import('./pages/configuracion-auto/configuracion-auto.module').then( m => m.ConfiguracionAutoPageModule)
  },





];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
