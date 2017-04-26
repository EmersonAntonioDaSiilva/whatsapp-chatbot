import { AuthGuard } from './pages/login/guards/auth.guard';
import { EnderecoComponent } from './pages/endereco/endereco.component';
import { PermicaoComponent } from './pages/permicao/permicao.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { EmpresaComponent } from './pages/empresa/empresa.component';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';

import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



const APP_ROUTES: Routes = [
    { path: 'usuario', component: UsuarioComponent, canActivate: [AuthGuard] },
    { path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard] },
    { path: 'permicao', component: PermicaoComponent, canActivate: [AuthGuard] },
    { path: 'empresa', component: EmpresaComponent, canActivate: [AuthGuard] },
    { path: 'endereco', component: EnderecoComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard]   },
    { path: '', component: LoginComponent }
    
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);