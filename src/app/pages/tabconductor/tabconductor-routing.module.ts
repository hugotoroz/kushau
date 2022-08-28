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
            path: 'cuenta',
            loadChildren: () => import('../../pages/miperfil/miperfil.module').then(m => m.MiperfilPageModule)
          },  {
            path: 'mainconductor',
            loadChildren: () => import('../../pages/mainconductor/mainconductor.module').then( m => m.MainconductorPageModule)
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
