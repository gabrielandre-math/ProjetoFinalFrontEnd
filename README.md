# SmartOrder - Frontend

## Descrição

O **SmartOrder** é um sistema de gerenciamento de pedidos para restaurantes e lanchonetes, desenvolvido com Angular. Ele permite que garçons façam pedidos e enviem diretamente para a cozinha em tempo real. Além disso, o sistema possui uma interface administrativa para gerenciamento de comandas, clientes e funcionários.

## Funcionalidades Principais

- **Gerenciamento de Comandas:** Criação, edição e exclusão de comandas com visualização em tempo real, utilizando WebSockets.
- **Dashboard de Analytics:** Exibição de gráficos interativos com dados de comandas, utilizando Chart.js.
- **Formulários Interativos:** Validação avançada e feedback visual com design responsivo, utilizando Reactive Forms.
- **Autenticação e Autorização:** Login, registro e controle de acesso baseados em JWT.
- **Animações e Efeitos Visuais:** Integração com `anime.js` para animações de hover e transições suaves.
- **Responsividade:** Interface totalmente responsiva, adaptando-se a diferentes tamanhos de tela, incluindo dispositivos móveis.

## Tecnologias Utilizadas

- **Angular:** Framework principal para construção da aplicação.
- **Chart.js:** Para criação de gráficos interativos no dashboard.
- **Bootstrap e Angular Material:** Para componentes e estilos responsivos.
- **anime.js:** Para animações e efeitos visuais dinâmicos.
- **WebSockets:** Para atualização em tempo real das comandas.
- **Toastr:** Para exibição de notificações e mensagens de feedback.

## Estrutura de Pastas

- **src/app/components:** Contém os componentes reutilizáveis como header, footer, cards, etc.
- **src/app/services:** Contém os serviços que fazem a comunicação com o backend, como `ComandaService`, `AuthService`, etc.
- **src/app/pages:** Contém as páginas principais como dashboard, listagem de clientes, login, etc.
- **src/assets:** Contém os arquivos estáticos, como imagens e ícones.

## Configuração

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/SmartOrder-frontend.git
   ```
2. **Instale as dependências:**
   ```bash
   npm install
   ```
3. **Inicie a aplicação:**
   ```bash
   ng serve
   ```
4. **Acesse a aplicação:**
   - Abra o navegador e vá para `http://localhost:4200`.

## Responsável pelo Projeto

<table>
  <tr>
    <td align="center">
      <a href="#" title="contribuidor">
        <img src="https://avatars.githubusercontent.com/u/60861872?s=400&u=49b2e6b1034e45f02529c6e165c41de8300ed350&v=4" width="100px;" alt="Foto do Gabriel"/><br>
        <sub>
          <b>Gabriel André</b>
        </sub>
      </a>
    </td>
  </tr>
</table>

## Contribuição

Para mais informações, entre em contato com: gabriel.alsilva@ufn.edu.br

Para contribuir com o projeto, faça um fork do repositório, crie um branch para sua feature, e submeta um pull request.

## Licença

Este projeto está licenciado sob a MIT License.
