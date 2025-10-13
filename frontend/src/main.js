import { HomeScreen } from './assets/screens/homeScreen.js';
import { LoginScreen } from './assets/screens/loginScreen.js';
import { RegisterScreen } from './assets/screens/registerScreen.js';
import { DashboardScreen } from './assets/screens/dashboardScreen.js';

const app = document.getElementById('app');
let currentUser = null;

const routes = {
    '/': renderHome,
    '/login': renderLogin,
    '/register': renderRegister,
    '/dashboard': renderDashboard
};

function router() {
    const path = window.location.pathname;

    if (path === '/dashboard' && !currentUser) {
        return navigateTo('/login');
    }
    if ((path === '/login' || path === '/register' || path === '/') && currentUser) {
        return navigateTo('/dashboard');
    }

    const renderFunction = routes[path] || renderHome;
    renderFunction();
}

function navigateTo(path) {
    window.history.pushState({}, '', path);
    router();
}

function renderHome() {
    app.innerHTML = HomeScreen();
    
    document.getElementById('goToLoginBtn').addEventListener('click', () => navigateTo('/login'));
    document.getElementById('goToRegisterBtn').addEventListener('click', () => navigateTo('/register'));
}

function renderLogin() {
    app.innerHTML = LoginScreen();
    const form = document.getElementById('loginForm');
    const goToRegisterBtn = document.getElementById('goToRegisterBtn');

    goToRegisterBtn.addEventListener('click', () => navigateTo('/register'));

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const errorMessageDiv = document.getElementById('errorMessage');
        errorMessageDiv.textContent = '';

        const email = event.target.email.value;
        const password = event.target.password.value;

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Ocorreu um erro desconhecido.');
            }

            currentUser = data.user;
            navigateTo('/dashboard');

        } catch (error) {
            errorMessageDiv.textContent = error.message;
        }
    });
}

function renderRegister() {
    app.innerHTML = RegisterScreen();
    const form = document.getElementById('registerForm');
    const goToLoginBtn = document.getElementById('goToLoginBtn');

    goToLoginBtn.addEventListener('click', () => navigateTo('/login'));

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const errorMessageDiv = document.getElementById('errorMessage');
        const name = event.target.name.value;
        const email = event.target.email.value;
        const password = event.target.password.value;

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password })
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message);

            alert('Cadastro realizado com sucesso! Faça o login.');
            navigateTo('/login');
        } catch (error) {
            errorMessageDiv.textContent = error.message;
        }
    });
}

    function renderDashboard() {
    // In a real app, you'd fetch this data from your API.
    // For now, we'll use sample data.
    const user = {
        name: 'Arthur',
        balance: 'R$ 4.750,80'
    };

    app.innerHTML = DashboardScreen(user);

    const logoutButton = document.getElementById('logoutButton');
    logoutButton.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('token');
        alert('Você foi desconectado.');
        navigateTo('/');
    });

    const toggleBalance = document.getElementById('toggle-balance');
    const balance = document.getElementById('balance');
    const hiddenBalance = 'R$ ●●●●,●●';
    let isBalanceVisible = true;

    toggleBalance.addEventListener('click', () => {
        if (isBalanceVisible) {
            balance.textContent = hiddenBalance;
            toggleBalance.classList.replace('fa-eye', 'fa-eye-slash');
        } else {
            balance.textContent = user.balance;
            toggleBalance.classList.replace('fa-eye-slash', 'fa-eye');
        }
        isBalanceVisible = !isBalanceVisible;
    });
}

async function checkAuthentication() {
    try {
        const response = await fetch('/api/check-auth');
        if (response.ok) {
            const data = await response.json();
            currentUser = data.user; 
        } else {
            currentUser = null;
        }
    } catch (error) {
        currentUser = null;
    }
    router();
}


window.addEventListener('popstate', router);

document.addEventListener('DOMContentLoaded', checkAuthentication);