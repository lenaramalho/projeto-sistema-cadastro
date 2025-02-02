import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router'; // Adicione esta linha
import { CadastroUsuarioComponent } from './cadastro-usuario/cadastro-usuario.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CadastroUsuarioComponent], // Adicione RouterOutlet aqui
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'meu-formulario';
}