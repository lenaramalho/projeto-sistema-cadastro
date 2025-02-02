# Sistema de Cadastro de Pessoas

Este é um projeto Angular que implementa um formulário de cadastro de usuários com validações customizadas, como a validação do CPF e da data de nascimento. O projeto também integra a busca de endereço via CEP utilizando a API do [ViaCEP](https://viacep.com.br/).

## Funcionalidades

- **Formulário de Cadastro:**  
  Permite o cadastro de usuário com os seguintes campos:
  - Nome
  - Email
  - Data de Nascimento (validação para formato `YYYY-MM-DD` e data não futura)
  - CPF (validação customizada com verificação dos dígitos verificadores)
  - CEP (com formatação e busca de endereço)
  - Logradouro, Bairro, Cidade e Estado (preenchidos automaticamente com base no CEP)

- **Validações Customizadas:**
  - Validação de CPF com verificação de dígitos e formatação.
  - Validação de data de nascimento para garantir que a data esteja no formato correto, seja válida e não seja uma data futura.

- **Integração com API ViaCEP:**  
  Ao informar o CEP, o formulário realiza uma chamada para a API do ViaCEP e preenche automaticamente os campos de endereço.

- **Feedback Visual:**  
  Mensagens de erro para campos inválidos e formatação dinâmica para CPF e CEP.

## Tecnologias Utilizadas

- **Angular:** Framework JavaScript para construção de SPAs (Single Page Applications).
- **TypeScript:** Linguagem de programação baseada em JavaScript, usada no Angular.

## Contribuição

Se você deseja contribuir para este projeto, siga os seguintes passos:

1. Fork o repositório.
2. Crie uma branch para sua funcionalidade (`git checkout -b feature/nova-funcionalidade`).
3. Faça suas alterações e commit (`git commit -am 'Adiciona nova funcionalidade'`).
4. Push para a branch (`git push origin feature/nova-funcionalidade`).
5. Abra um pull request para revisão.

## Conecte-se comigo!

Você pode me encontrar nas redes sociais para saber mais sobre o meu trabalho e outros projetos:

- [LinkedIn](https://www.linkedin.com/in/milena-ramalho-3ab8b8262/)
- [Instagram](https://www.instagram.com/mismeteora/)
- [GitHub](https://github.com/lenaramalho)

Fique à vontade para entrar em contato ou me enviar sugestões! 😊
