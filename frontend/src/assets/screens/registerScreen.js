export function RegisterScreen() {
    return `
        <div class="container-register">
            <h1>Web Finanças</h1>
            <h3>Cadastro</h3>
            <form id="registerForm" class="form">
                <div id="errorMessage" class="error-message"></div>

                <h1>Nome:</h1>
                <input type="text" id="name" name="name" placeholder="Digite seu nome completo" required>

                <h1>CPF:</h1>
                <input type="cpf" id="cpf" name="cpf" placeholder="Digite seu CPF" required>

                <h1>Email:</h1>
                <input type="email" id="email" name="email" placeholder="Digite seu email" required>
                
                <h1>Senha:</h1>
                <input type="password" id="password" name="password" placeholder="Digite sua senha" required>
                
                <div class="buttons">
                    <button type="submit">Cadastrar</button>
                    <button type="button" id="goToLoginBtn">Já tenho uma conta</button>
                </div>
            </form>
        </div>
        <div class="footer">
            <p>&copy; 2025 Web Finanças. Todos os direitos reservados.</p>
            <h3>Arthur | Felipe Vieira</h3>
        </div>
    `;
}