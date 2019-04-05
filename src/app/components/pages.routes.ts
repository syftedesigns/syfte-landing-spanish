import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { CasesComponent } from './cases/cases.component';
import { ContactComponent } from './contact/contact.component';
import { FormSendComponent } from './form-send/form-send.component';


const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        data: {Title: 'Construimos tu marca'}
    },
    {
        path: 'nosotros',
        component: AboutComponent,
        data: {Title: 'Nosotros'}
    },
    {
        path: 'casos',
        component: CasesComponent,
        data: {Title: 'Casos de éxito'}
    },
    {
        path: 'contacto',
        component: ContactComponent,
        data: {Title: 'Contáctanos'}
    },
    {
        path: 'enviado',
        component: FormSendComponent,
        data: {Title: 'Agradecimiento'}
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PageRoutingModule {}
