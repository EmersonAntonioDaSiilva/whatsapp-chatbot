import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MaterializeModule } from 'angular2-materialize';

import { AppComponent } from './app.component';
import { HeaderComponent } from './pages/themes/header/header.component';
import { MenuComponent } from './pages/themes/menu/menu.component';
import { FooterComponent } from './pages/themes/footer/footer.component';
import { EnderecoComponent } from './pages/endereco/endereco.component';
import { PermicaoComponent } from './pages/permicao/permicao.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { EmpresaComponent } from './pages/empresa/empresa.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';

import { routing } from './app.routing';

import { AuthService } from './pages/login/auth.service';
import { AuthGuard } from './pages/login/guards/auth.guard';
import { EnderecoService } from './pages/endereco/endereco.service';
import { MessageService } from './message.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    FooterComponent,
    EnderecoComponent,
    PermicaoComponent,
    PerfilComponent,
    UsuarioComponent,
    EmpresaComponent,
    HomeComponent,
    LoginComponent,
    UsuarioComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    MaterializeModule
  ],
  providers: [{
      provide: LOCALE_ID,
      useValue: 'pt-BR'
    },
    AuthService,
    AuthGuard,
    EnderecoService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
