export function DashboardScreen(user) {
    return `
        <header class="main-header">
            <div class="header-container">
                <a href="#">Web Finanças</a>
                <div class="user-info">
                    <span>Olá, ${user.name}!</span>
                    <a href="#" id="logoutButton" class="logout-button">Sair <i class="fas fa-sign-out-alt"></i></a>
                </div>
            </div>
        </header>

        <div class="main-container">
            <div class="content-box">
                <div class="balance-section">
                    <h2>Saldo Disponível</h2>
                    <div class="balance-value">
                        <span id="balance">${user.balance}</span>
                        <i class="fas fa-eye" id="toggle-balance"></i>
                    </div>
                </div>

                <div class="quick-actions">
                    <a href="#" class="action-item">
                        <div class="icon"><i class="fas fa-exchange-alt"></i></div>
                        <span>Transferir</span>
                    </a>
                    <a href="#" class="action-item">
                        <div class="icon"><i class="fab fa-pix"></i></div>
                        <span>Área Pix</span>
                    </a>
                    <a href="#" class="action-item">
                        <div class="icon"><i class="fas fa-barcode"></i></div>
                        <span>Pagar</span>
                    </a>
                    <a href="#" class="action-item">
                        <div class="icon"><i class="fas fa-receipt"></i></div>
                        <span>Extrato</span>
                    </a>
                </div>

                <div class="recent-activity">
                    <h3>Atividade Recente</h3>
                    <ul>
                        <li class="transaction-item expense">
                            <span>Compra - Supermercado</span>
                            <span>- R$ 254,90</span>
                        </li>
                        <li class="transaction-item income">
                            <span>Transferência Recebida - Felipe V.</span>
                            <span>+ R$ 1.200,00</span>
                        </li>
                        <li class="transaction-item expense">
                            <span>Pagamento Fatura Cartão</span>
                            <span>- R$ 850,00</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="footer">
            <p>&copy; 2025 Web Finanças. Todos os direitos reservados.</p>
            <h3>Arthur | Felipe Vieira</h3>
        </div>
    `;
}