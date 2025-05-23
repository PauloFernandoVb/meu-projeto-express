const express = require('express');
const app = express();
let listaClientes=[];

//processando o formualario, ele pega os dados
app.use(express.urlencoded({ extended: true }));


app.get('/', (requisicao, resposta) => {
  resposta.send(`
<html lang="pt-br">
  <head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" crossorigin="anonymous">
    <title>Página Inicial do Trabalho</title>
  </head>
  <body>
    <ul class="nav justify-content-center">
      <li class="nav-item">
        <a class="nav-link" href="/">Menu principal</a>
      </li>
      <li class="nav-item">
        <a class="nav-link active" href="/cadastroClientes">Cadastro de Cliente</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/clientes">Clientes Cadastrados</a>
      </li>
    </ul>

    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" crossorigin="anonymous"></script>
  </body>
</html>
  `);
});

app.get('/cadastroClientes', (requisicao, resposta) => {
  resposta.send(`
<html lang="pt-br">
  <head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" crossorigin="anonymous">
    <title>Cadastro de clientes</title>
  </head>
  <body>
    <div class="container w-80 mb-4 mt-4">
      <form method="POST" action="/cadastroClientes" class="border p-2">
        <fieldset>
          <legend class="text-center">Cadastro de Clientes</legend>
        </fieldset>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="email">Email</label>
            <input type="email" name="email" class="form-control" id="email" placeholder="Email" >
          </div>
          <div class="form-group col-md-6">
            <label for="senha">Senha</label>
            <input type="password" class="form-control" id="senha" placeholder="Senha">
          </div>
        </div>
        <div class="form-group">
          <label for="nome">Nome completo</label>
          <input type="text" name="nome" class="form-control" id="nome" placeholder="Nome completo" >
        </div>
        <div class="form-group">
          <label for="endereco">Endereço</label>
          <input type="text" class="form-control" id="endereco" placeholder="Rua dos Lobos, nº 90" name="endereco" >
        </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="cidade">Cidade</label>
            <input type="text" class="form-control" id="cidade" placeholder="Presidente Prudente" name="cidade">
          </div>
          <div class="form-group col-md-4">
            <label for="estado">Estado</label>
            <select id="estado" class="form-control" name="estado">
              <option value="">Escolher...</option>
                  <option>AC</option>
                  <option>AL</option>
                  <option>AP</option>
                  <option>AM</option>
                  <option>BA</option>
                  <option>CE</option>
                  <option>DF</option>
                  <option>ES</option>
                  <option>GO</option>
                  <option>MA</option>
                  <option>MT</option>
                  <option>MS</option>
                  <option>MG</option>
                  <option>PA</option>
                  <option>PB</option>
                  <option>PR</option>
                  <option>PE</option>
                  <option>PI</option>
                  <option>RJ</option>
                  <option>RN</option>
                  <option>RS</option>
                  <option>RO</option>
                  <option>RR</option>
                  <option>SC</option>
                  <option>SP</option>
                  <option>SE</option>
                  <option>TO</option>

            </select>
          </div>
          <div class="form-group col-md-2">
            <label for="inputCEP">CEP</label>
            <input type="text" class="form-control" id="inputCEP" placeholder="99.999-99" name="cep">
          </div>
        </div>
        <div class="form-group">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" id="gridCheck">
            <label class="form-check-label" for="gridCheck">
              Aceito receber ligações
            </label>
          </div>
        </div>
        <button type="submit" class="btn btn-primary">Cadastrar</button>
        <a href="/" class="btn btn-secondary">Início</a>
      </form>
    </div>

    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" crossorigin="anonymous"></script>
  </body>
</html>
  `);
});
app.post("/cadastroClientes", (requisicao, resposta) => {
  let email = requisicao.body.email;
  let nome = requisicao.body.nome;
  let endereco = requisicao.body.endereco;
  let cidade = requisicao.body.cidade;
  let estado = requisicao.body.estado;
  let cep = requisicao.body.cep;

  if (email && nome && endereco && cidade && estado && cep) {
    listaClientes.push({
      email: email,
      nome: nome,
      endereco: endereco,
      cidade: cidade,
      estado: estado,
      cep: cep
    });
    return resposta.redirect('/clientes');
  }

  let conteudo = `
  <html lang="pt-br">
    <head>
      <meta charset="UTF-8">
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css">
      <title>Cadastro de clientes</title>
    </head>
    <body>
      <div class="container w-80 mb-4 mt-4">
        <form method="POST" action="/cadastroClientes" class="border p-2">
          <fieldset>
            <legend class="text-center">Cadastro de Clientes</legend>
          </fieldset>
          <div class="form-row">
            <div class="form-group col-md-6">
  `;

  if (!email) {
    conteudo += `
      <label for="email">Email</label>
      <input type="email" name="email" class="form-control" id="email" placeholder="Email">
      <span class="invalid-feedback d-block">Por Favor informe o Email</span>
    `;
  } else {
    conteudo += `
      <label for="email">Email</label>
      <input type="email" name="email" class="form-control" id="email" value="${email}" placeholder="Email">
    `;
  }

  conteudo += `</div>
            <div class="form-group col-md-6">
              <label for="senha">Senha</label>
              <input type="password" class="form-control" id="senha" placeholder="Senha">
            </div>
          </div>

          <div class="form-group">
  `;
  if (!nome) {
    conteudo += `
      <label for="nome">Nome completo</label>
      <input type="text" name="nome" class="form-control" id="nome" placeholder="Nome completo">
      <span class="invalid-feedback d-block">Por Favor informe o Nome</span>
    `;
  } else {
    conteudo += `
      <label for="nome">Nome completo</label>
      <input type="text" name="nome" class="form-control" id="nome" value="${nome}" placeholder="Nome completo">
    `;
  }

  conteudo += `</div>
          <div class="form-group">
  `;
  if (!endereco) {
    conteudo += `
      <label for="endereco">Endereço</label>
      <input type="text" class="form-control" id="endereco" placeholder="Rua dos Lobos, nº 90" name="endereco">
      <span class="invalid-feedback d-block">Por Favor informe o Endereço</span>
    `;
  } else {
    conteudo += `
      <label for="endereco">Endereço</label>
      <input type="text" class="form-control" id="endereco" name="endereco" value="${endereco}" placeholder="Rua dos Lobos, nº 90">
    `;
  }

  conteudo += `</div>
          <div class="form-row">
            <div class="form-group col-md-6">
  `;
  if (!cidade) {
    conteudo += `
      <label for="cidade">Cidade</label>
      <input type="text" class="form-control" id="cidade" placeholder="Presidente Prudente" name="cidade">
      <span class="invalid-feedback d-block">Por Favor informe a Cidade</span>
    `;
  } else {
    conteudo += `
      <label for="cidade">Cidade</label>
      <input type="text" class="form-control" id="cidade" value="${cidade}" placeholder="Presidente Prudente" name="cidade">
    `;
  }

  conteudo += `</div>
            <div class="form-group col-md-4">
  `;
  if (!estado) {
    conteudo += `
      <label for="estado">Estado</label>
      <select id="estado" class="form-control" name="estado">
        <option value="">Escolher...</option>
        <option value="AC">AC</option>
        <option value="AL">AL</option>
        <option value="AP">AP</option>
        <option value="AM">AM</option>
        <option value="BA">BA</option>
        <option value="CE">CE</option>
        <option value="DF">DF</option>
        <option value="ES">ES</option>
        <option value="GO">GO</option>
        <option value="MA">MA</option>
        <option value="MT">MT</option>
        <option value="MS">MS</option>
        <option value="MG">MG</option>
        <option value="PA">PA</option>
        <option value="PB">PB</option>
        <option value="PR">PR</option>
        <option value="PE">PE</option>
        <option value="PI">PI</option>
        <option value="RJ">RJ</option>
        <option value="RN">RN</option>
        <option value="RS">RS</option>
        <option value="RO">RO</option>
        <option value="RR">RR</option>
        <option value="SC">SC</option>
        <option value="SP">SP</option>
        <option value="SE">SE</option>
        <option value="TO">TO</option>
      </select>
      <span class="invalid-feedback d-block">Por Favor informe o Estado</span>
    `;
  } else {
    conteudo += `
      <label for="estado">Estado</label>
      <select id="estado" class="form-control" name="estado">
        <option value="${estado}" selected>${estado}</option>
        <option value="AC">AC</option>
        <option value="AL">AL</option>
        <option value="AP">AP</option>
        <option value="AM">AM</option>
        <option value="BA">BA</option>
        <option value="CE">CE</option>
        <option value="DF">DF</option>
        <option value="ES">ES</option>
        <option value="GO">GO</option>
        <option value="MA">MA</option>
        <option value="MT">MT</option>
        <option value="MS">MS</option>
        <option value="MG">MG</option>
        <option value="PA">PA</option>
        <option value="PB">PB</option>
        <option value="PR">PR</option>
        <option value="PE">PE</option>
        <option value="PI">PI</option>
        <option value="RJ">RJ</option>
        <option value="RN">RN</option>
        <option value="RS">RS</option>
        <option value="RO">RO</option>
        <option value="RR">RR</option>
        <option value="SC">SC</option>
        <option value="SP">SP</option>
        <option value="SE">SE</option>
        <option value="TO">TO</option>
      </select>
    `;
  }

  conteudo += `</div>
            <div class="form-group col-md-2">
  `;
  if (!cep) {
    conteudo += `
      <label for="inputCEP">CEP</label>
      <input type="text" class="form-control" id="inputCEP" placeholder="99.999-99" name="cep">
      <span class="invalid-feedback d-block">Por Favor informe o CEP</span>
    `;
  } else {
    conteudo += `
      <label for="inputCEP">CEP</label>
      <input type="text" class="form-control" id="inputCEP" value="${cep}" placeholder="99.999-99" name="cep">
    `;
  }

  conteudo += `</div>
          </div>
          <div class="form-group">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="gridCheck">
              <label class="form-check-label" for="gridCheck">
                Aceito receber ligações
              </label>
            </div>
          </div>
          <button type="submit" class="btn btn-primary">Cadastrar</button>
          <a href="/" class="btn btn-secondary">Início</a>
        </form>
      </div>
      <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js"></script>
      <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"></script>
    </body>
  </html>
  `;

  resposta.send(conteudo);
});

app.get('/clientes', (req, res) => {
  let html = `
  <!DOCTYPE html>
  <html lang="pt-br">
    <head>
      <meta charset="UTF-8">
      <title>Clientes Cadastrados</title>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" crossorigin="anonymous">
    </head>
    <body>
      <div class="container mt-5">
        <h2 class="mb-4 text-center">Clientes Cadastrados</h2>
        <table class="table table-bordered table-striped">
          <thead class="thead-dark">
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Endereço</th>
              <th>Cidade</th>
              <th>Estado</th>
              <th>CEP</th>
            </tr>
          </thead>
          <tbody>`;

  if (listaClientes.length === 0) {
    html += `
      <tr>
        <td colspan="6" class="text-center">Nenhum cliente cadastrado.</td>
      </tr>`;
  } else {
        for (let i = 0; i < listaClientes.length; i++) {
          let cliente = listaClientes[i];
          html += `
            <tr>
              <td>${cliente.nome}</td>
              <td>${cliente.email}</td>
              <td>${cliente.endereco}</td>
              <td>${cliente.cidade}</td>
              <td>${cliente.estado}</td>
              <td>${cliente.cep}</td>
            </tr>`;
            }
  }

  html += `
          </tbody>
        </table>
        <a href="/" class="btn btn-secondary">Voltar ao Início</a>
      </div>
    </body>
  </html>`;

  res.send(html);
});



const PORT = process.env.PORT || 4550;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

module.exports = app;
console.log("Servidor funcionando!");
