import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'inicio-sesion',
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
    path: 'conductor',
    loadChildren: () => import('./pages/conductor/conductor.module').then( m => m.ConductorPageModule)
  },
  {
    path: 'mainconductor',
    loadChildren: () => import('./pages/mainconductor/mainconductor.module').then( m => m.MainconductorPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
