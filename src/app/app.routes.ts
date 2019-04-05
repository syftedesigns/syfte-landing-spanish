import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './components/pages.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
    {
        path: '',
        component: PagesComponent,
        loadChildren: './components/pages.module#PagesModule'
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];

export const SYFTE_ROUTES = RouterModule.forRoot(routes, {
    useHash: true
});
