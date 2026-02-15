import { Routes } from '@angular/router';

export const routes: Routes = [
    {
         path: '',
        loadComponent: () => import('./view/home/home').then(m => m.Home)
    },
    {
        path: 'chat',
        loadComponent: () => import('./view/chat/chat').then(m => m.Chat)
    }
];
