import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'chat',
        loadComponent: () => import('./view/chat/chat').then(m => m.Chat)
    }
];
