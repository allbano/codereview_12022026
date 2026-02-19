import { Routes } from '@angular/router';
import { ChatService, ChatSession } from './services/chat-service';
import { Login } from './view/login/login';

export const routes: Routes = [
    {
         path: '',
        loadComponent: () => import('./view/home/home').then(m => m.Home)
    },
    {
        path: 'login/signin',
        loadComponent: () => import('./view/login/login').then( m=> m.Login),
    },
    {
            path: 'chat',
            loadComponent: () => import('./view/chat/chat').then(m => m.Chat)
    },
    {
        path: `chat/:uuid`,
        loadComponent: () => import('./view/chat/chat').then(m => m.Chat)
    }
];
