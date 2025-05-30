const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3');
const porta = 2030;

const app = express();
const db = new sqlite3.Database('dados.db');

app.use(express.static(path.join(__dirname, '/login')));
app.use(express.static(path.join(__dirname, '/login/imagens')));
app.use(express.static(path.join(__dirname + '/login/biblioteca')))
app.use(express.static(path.join(__dirname + '/login/biblioteca/imagens')))
app.use(express.static(path.join(__dirname + '/login/biblioteca/livros')))
app.use(express.json());

// CRIAR TABELA
// create();
function create() {
    const tabela = `
        CREATE TABLE IF NOT EXISTS ADM (
            ID INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            email VARCHAR(100) NOT NULL,
            senha VARCHAR(50) NOT NULL
        )
    `;

    db.run(tabela, (err) => {
        if (err) console.log('Erro ao criar tabela:', err);
        else console.log('Tabela criada com sucesso!');
    });
}


// delet();
function delet() {
    var deletar = 'DROP TABLE FAVORITOS;';

    db.run(deletar, (err) => {
        if(err) console.log('Deu errado deletar');
        else console.log('deu tudo certinho em deletar')
    })
}





// INSERIR DADOS FIXOS AO INICIAR
// insert();
function insert() {
    const inserir = 'INSERT INTO Funcionarios (nome, email, senha, salario) VALUES (?, ?, ?, ?)';
    const nome = 'Isaque Almeida Portugal';
    const email = 'Isaquep88@site.com';
    const senha = 'Teste123@';
    const salario = 19521.00;

    db.run(inserir, [nome, email, senha, salario], (err) => {
        if (err) console.log('Erro ao inserir dados:');
        else console.log('Dados inseridos com sucesso!');
    });
}


// ROTA PRINCIPAL(LOGIN) - '/'
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/login/login.html'));
});


// ROTA CADASTRO - '/cadastro'
app.get('/cadastro', (req, res) => {
    res.sendFile(path.join(__dirname + '/login/cadastro.html'));
});

//ROTA PAGINA INICIAL(HOME - CATALOGO) - '/catalogo'
app.get('/catalogo', (req,res) => {
    res.sendFile(path.join(__dirname + '/login/biblioteca/catalogo.html'));
})

// ROTA PARA INICIO(DEPOIS DO LOGIN) - '/inicio'
app.get('/inicio', (req, res) => {
    res.sendFile(path.join(__dirname + '/login/biblioteca/catalogo.html'))
})

// ROTA PARA PERFIL - '/perfil'
app.get('/perfil', (req, res) => {
    res.sendFile(path.join(__dirname + '/login/biblioteca/perfil.html'))
})

// ROTA PRA FAVORITAR(DESENVOLVIMENTO)
app.get('/desenvolvimento', (req, res) => {[
    res.sendFile(path.join(__dirname + '/login/biblioteca/desenvolvimento.html'))
]})

// ROTA LOGIN (VERIFICAR)
app.post('/verificar', (req, res) => {
    var nome = req.body.nome;
    var senha = req.body.senha;

    // Verificar o login no banco de dados
    db.get('SELECT * FROM USUARIOS WHERE nome = ? AND senha = ?', [nome, senha], (err, row) => {
        if (err) {
            console.log('Erro ao verificar login:', err);
        } else if (row) {
            res.send('1');
        }
        else {
            res.send('Erro de login!')
            console.log('erro de login!')
        }
    });
});


// ROTA PARA RECEBER DADOS DO FRONT
app.post('/salvar', (req, res) => {
    var nome = req.body.nome;
    var email = req.body.email;
    var senha = req.body.senha;

    var inserir  = 'INSERT INTO ADM (nome, email, senha) VALUES (?, ?, ?)';

    db.run(inserir, [nome, email, senha], (err) => {
        if(err) res.send(err, 'CADASTRO INVÁLIDO!');
        else res.send('Cadastro realizado com sucesso!!')
    })

});


// ROTA PARA BAIXAR LIVROS - VICTOR
app.get('/livros/:arquivo', (req, res) => {
    const nomeDoArquivo = req.params.arquivo;
    const caminhoCompleto = path.join(__dirname, 'livros', nomeDoArquivo);

    res.download(caminhoCompleto, (err) => {
        if (err) {
            console.log(err,'Livro nao baixado!!')
            res.status(404).send('Livro não encontrado.');
        }
    });
});


// INICIAR SERVIDOR
app.listen(porta, () => {
    console.log(`Servidor rodando na porta ${porta}`);
});
