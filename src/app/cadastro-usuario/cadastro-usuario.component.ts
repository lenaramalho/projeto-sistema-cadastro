import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cadastro-usuario',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule],
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.css']
})
export class CadastroUsuarioComponent implements OnInit {
  cadastroForm!: FormGroup;
  usuarios: any[] = [];
  loading: boolean = false;

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.cadastroForm = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dataNascimento: ['', [Validators.required, this.dataNascimentoValidator]],
      cpf: ['', [
        Validators.required, 
        Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/),
        this.cpfValidator
      ]],
      cep: ['', [Validators.required, Validators.pattern(/^\d{5}-\d{3}$/)]],
      logradouro: ['', Validators.required],
      bairro: ['', Validators.required],
      cidade: ['', Validators.required],
      estado: ['', Validators.required]
    });

    this.cadastroForm.get('cep')?.valueChanges.subscribe((cep) => {
      if (cep && cep.length === 9) {
        this.buscarEndereco(cep);
      }
    });

    this.cadastroForm.get('dataNascimento')?.valueChanges.subscribe((valor) => {
      this.formatarData({ target: { value: valor } });
    });
  }

  formatarData(event: any): void {
    let valor = event.target.value.replace(/\D/g, ''); 
    valor = valor.substring(0, 8); 

    if (valor.length > 4) {
      valor = valor.replace(/^(\d{2})(\d{2})(\d{0,4})/, '$1/$2/$3');
    } else if (valor.length > 2) {
      valor = valor.replace(/^(\d{2})(\d{0,2})/, '$1/$2');
    }

    event.target.value = valor;
    this.cadastroForm.get('dataNascimento')?.setValue(valor, { emitEvent: false });
  }

  cpfValidator(control: AbstractControl): ValidationErrors | null {
    const cpf = control.value;
    if (!cpf) return null;

    const cleanCPF = cpf.replace(/\D/g, '');
    
    if (cleanCPF.length !== 11) {
      return { cpfInvalid: true };
    }

    if (/^(\d)\1+$/.test(cleanCPF)) {
      return { cpfInvalid: true };
    }

    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cleanCPF.charAt(i)) * (10 - i);
    }
    let remainder = sum % 11;
    let firstVerifier = remainder < 2 ? 0 : 11 - remainder;
    if (firstVerifier !== parseInt(cleanCPF.charAt(9))) {
      return { cpfInvalid: true };
    }

    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cleanCPF.charAt(i)) * (11 - i);
    }
    remainder = sum % 11;
    let secondVerifier = remainder < 2 ? 0 : 11 - remainder;
    if (secondVerifier !== parseInt(cleanCPF.charAt(10))) {
      return { cpfInvalid: true };
    }

    return null;
  }

  dataNascimentoValidator(control: AbstractControl): ValidationErrors | null {
    const dateValue = control.value;
    if (!dateValue) return null;

    const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    const match = dateValue.match(dateRegex);
    if (!match) {
      return { invalidDate: 'Formato de data inválido. Use DD/MM/AAAA.' };
    }

    const day = parseInt(match[1], 10);
    const month = parseInt(match[2], 10) - 1;
    const year = parseInt(match[3], 10);

    const data = new Date(year, month, day);
    console.log('Data gerada:', data);

    const isValidDate = data.getDate() === day && data.getMonth() === month && data.getFullYear() === year;
    if (!isValidDate) {
      return { invalidDate: 'Data inválida.' };
    }

    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    if (data > hoje) {
      return { futureDate: 'A data de nascimento não pode ser futura.' };
    }

    return null;
  }

  calcularIdade(dataNascimento: string): number {
    const [day, month, year] = dataNascimento.split('/').map(Number);
    const nascimento = new Date(year, month - 1, day);
    const hoje = new Date();
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();
    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }
    return idade;
  }

  buscarEndereco(cep: string): void {
    this.http.get(`https://viacep.com.br/ws/${cep}/json/`).subscribe({
      next: (endereco: any) => {
        if (!endereco.erro) {
          this.cadastroForm.patchValue({
            logradouro: endereco.logradouro,
            bairro: endereco.bairro,
            cidade: endereco.localidade,
            estado: endereco.uf
          });
        } else {
          alert('CEP não encontrado.');
        }
      },
      error: (err) => {
        console.error('Erro ao buscar CEP:', err);
        alert('Erro ao buscar CEP. Tente novamente.');
      }
    });
  }

  formatarCpf(event: any): void {
    let valor = event.target.value.replace(/\D/g, '');
    valor = valor.substring(0, 11);
    if (valor.length > 9) {
      valor = valor.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, '$1.$2.$3-$4');
    } else if (valor.length > 6) {
      valor = valor.replace(/(\d{3})(\d{3})(\d{0,3})/, '$1.$2.$3');
    } else if (valor.length > 3) {
      valor = valor.replace(/(\d{3})(\d{0,3})/, '$1.$2');
    }
    event.target.value = valor;
    this.cadastroForm.get('cpf')?.setValue(valor, { emitEvent: false });
  }

  formatarCep(event: any): void {
    let valor = event.target.value.replace(/\D/g, '');
    valor = valor.substring(0, 8);
    if (valor.length > 5) {
      valor = valor.replace(/(\d{5})(\d{0,3})/, '$1-$2');
    }
    event.target.value = valor;
    this.cadastroForm.get('cep')?.setValue(valor, { emitEvent: false });
  }

  onSubmit(): void {
    if (this.cadastroForm.valid) {
      this.loading = true;

      const dataNascimento = this.cadastroForm.get('dataNascimento')?.value;
      const idade = this.calcularIdade(dataNascimento);

      const usuario = {
        ...this.cadastroForm.getRawValue(),
        idade: idade
      };

      this.usuarios.push(usuario);
      console.log('Usuário cadastrado:', usuario);

      this.cadastroForm.reset();

      setTimeout(() => {
        this.loading = false;
      }, 500);
    } else {
      console.log('Formulário inválido');
    }
  }
}
