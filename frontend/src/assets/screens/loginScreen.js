export function LoginScreen() {
    return `
        <div class="container-login">
            <h1>Web Finanças</h1>
            <h3>Login</h3>
            <form id="loginForm" class="form">
                <div id="errorMessage" class="error-message"></div>

                <h1>Email:</h1>
                <input type="email" id="email" name="email" placeholder="Digite seu email" required>
                
                <h1>Senha:</h1>
                <input type="password" id="password" name="password" placeholder="Digite sua senha" required>
                
                <div class="buttons">
                    <button type="submit">Entrar</button>
                    <button type="button" id="goToRegisterBtn">Cadastrar</button>
                </div>
            </form>
        </div>
        <div class="footer">
            <p>&copy; 2025 Web Finanças. Todos os direitos reservados.</p>
            <h3>Arthur | Felipe Vieira</h3>
        </div>
    `;
}