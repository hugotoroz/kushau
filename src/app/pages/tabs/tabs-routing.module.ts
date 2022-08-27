import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    //Ruta hija para que los tabs puedan redirigir a pestañas.
    children: [
      {
        path: '',
        children: [
          {
            path: 'cuenta',
            loadChildren: () => import('../../pages/miperfil/miperfil.module').then( m => m.MiperfilPageModule)
          },
          {
            path: 'configuracion',
            loadChildren: () => import('../../pages/configuracion/configuracion.module').then( m => m.ConfiguracionPageModule)
          },
          {
            path: 'autos',
            loadChildren: () => import('../../pages/autos/autos.module').then( m => m.AutosPageModule)
          }
        ]
      }/*,
      {
        Elimina este comentario para agregar otra ruta
      }
      */
    ]
  },
  {
    path: '',
    redirectTo: 'tabs/autos',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule { }


