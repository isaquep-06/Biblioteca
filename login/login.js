const usuarios = [
    { email: "teste@exemplo.com", senha: "123456" },
    { email: "admin@site.com", senha: "admin123" },
    {email: "admdono@site.com", senha: "adm123"}
];

// Mostrar senha
function mostrarSenha() {
    const input = document.getElementById("senha");
    const img = document.getElementById("olho");

    if (!input || !img) return;

    if (input.type === "password") {
        input.type = "text";
        img.src = "olho-aberto.png";
        img.alt = "Ocultar senha";
    } else {
        input.type = "password";
        img.src = "fechado.png";
        img.alt = "Mostrar senha";
    }
}

// Fazer login
function fazerLogin() {
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();
    const lembrar = document.getElementById("lembrar").checked;

    if (!email || !senha) {
        alert("Preencha todos os campos.");
        return;
    }

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailValido) {
        alert("Digite um e-mail válido.");
        return;
    }

    const usuarioEncontrado = usuarios.find(
        user => user.email === email && user.senha === senha
    );

    if (usuarioEncontrado) {
        alert("Login realizado com sucesso!");

        // Salvar e-mail se marcado
        if (lembrar) {
            localStorage.setItem("emailSalvo", email);
        } else {
            localStorage.removeItem("emailSalvo");
        }

        // Simulando sessão
        localStorage.setItem("usuarioLogado", JSON.stringify(usuarioEncontrado));

        // Redireciona
        // window.location.href = "home.html";
    } else {
        alert("E-mail ou senha incorretos.");
    }
}

// Ao carregar a página, preencher o e-mail se tiver salvo
window.onload = function () {
    const emailSalvo = localStorage.getItem("emailSalvo");
    if (emailSalvo) {
        document.getElementById("email").value = emailSalvo;
        document.getElementById("lembrar").checked = true;
    }
};



function mostrarSenha() {
            const input = document.getElementById("senha");
            const img = document.getElementById("olho");

            if (input.type === "password") {
                input.type = "text";
                img.src = "olho-aberto.png"; // Caminho da imagem do olho aberto
                img.alt = "Ocultar senha";
            } else {
                input.type = "password";
                img.src = "fechado.png"; // Caminho da imagem do olho fechado
                img.alt = "Mostrar senha";
            }
        }