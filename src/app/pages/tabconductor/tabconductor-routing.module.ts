import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabconductorPage } from './tabconductor.page';

const routes: Routes = [
  {
    path: 'tabconductor',
    component: TabconductorPage,
    children: [
      {
        path: '',
        children: [
          {
            path: 'mainconductor',
            loadChildren: () => import('../../pages/mainconductor/mainconductor.module').then( m => m.MainconductorPageModule)
          },
          {
            path: 'billetera',
            loadChildren: () => import('../../pages/billetera/billetera.module').then( m => m.BilleteraPageModule)
          },
          {
            path: 'miperfil-conductor',
            loadChildren: () => import('../../pages/miperfil-conductor/miperfil-conductor.module').then( m => m.MiperfilConductorPageModule)
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
    redirectTo: 'tabconductor/mainconductor',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabconductorPageRoutingModule { }
