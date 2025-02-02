import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { CadastroUsuarioComponent } from './app/cadastro-usuario/cadastro-usuario.component';

bootstrapApplication(AppComponent, {
  providers: [],
}).catch((err) => console.error(err));