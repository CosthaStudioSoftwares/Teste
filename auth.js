// --- CONFIGURAÇÃO DO FIREBASE ---
const firebaseConfig = {
    apiKey: "AIzaSyAv54tgJ5oYrwTSNXpB2rCGjNbhJhe2CoM",
    authDomain: "stolinx-d6e26.firebaseapp.com",
    projectId: "stolinx-d6e26",
    storageBucket: "stolinx-d6e26.appspot.com",
    messagingSenderId: "715535971682",
    appId: "1:715535971682:web:66620d1590ae3e4ba6a83b"
};

// --- INICIALIZAÇÃO DO FIREBASE ---
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// --- SELETORES DE ELEMENTOS DO DOM ---
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const forgotPasswordForm = document.getElementById('forgot-password-form');
const authMessage = document.getElementById('auth-message');

const showRegisterLink = document.getElementById('show-register');
const showLoginLink = document.getElementById('show-login');
const showForgotPasswordLink = document.getElementById('show-forgot-password');
const showLoginFromForgotLink = document.getElementById('show-login-from-forgot');

// --- FUNÇÕES AUXILIARES ---

/**
 * Exibe uma mensagem de status (erro ou sucesso) na interface.
 * @param {string} message - A mensagem a ser exibida.
 * @param {string} type - O tipo da mensagem ('error' ou 'success').
 */
function showAuthMessage(message, type = 'error') {
    authMessage.textContent = message;
    authMessage.className = type;
    authMessage.style.display = 'block';
}

/**
 * Esconde a mensagem de autenticação.
 */
function hideAuthMessage() {
    authMessage.style.display = 'none';
}

/**
 * Mostra um formulário e esconde os outros.
 * @param {HTMLElement} formToShow - O formulário a ser exibido.
 */
function switchForm(formToShow) {
    loginForm.style.display = 'none';
    registerForm.style.display = 'none';
    forgotPasswordForm.style.display = 'none';
    formToShow.style.display = 'block';
    hideAuthMessage();
}

// --- EVENT LISTENERS PARA TROCA DE FORMULÁRIOS ---

showRegisterLink.addEventListener('click', () => switchForm(registerForm));
showLoginLink.addEventListener('click', () => switchForm(loginForm));
showForgotPasswordLink.addEventListener('click', () => switchForm(forgotPasswordForm));
showLoginFromForgotLink.addEventListener('click', () => switchForm(loginForm));


// --- LÓGICA DE AUTENTICAÇÃO ---

// Handle Login
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    if (!email || !password) {
        showAuthMessage('Por favor, preencha todos os campos.');
        return;
    }

    auth.signInWithEmailAndPassword(email, password)
        .catch(error => {
            let message = 'Ocorreu um erro. Tente novamente.';
            if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
                message = 'E-mail ou senha incorretos.';
            }
            showAuthMessage(message);
        });
});

// Handle Registration
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    
    if (!email || !password) {
        showAuthMessage('Por favor, preencha todos os campos.');
        return;
    }

    auth.createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
            // Cria um documento de perfil de usuário para armazenar o status de ativação
            return db.collection('users').doc(userCredential.user.uid).set({
                email: userCredential.user.email,
                active: false,
                expiresAt: null
            });
        })
        .then(() => {
            showAuthMessage('Conta criada! Faça login para ativar.', 'success');
            setTimeout(() => switchForm(loginForm), 2000);
        })
        .catch(error => {
            let message = 'Ocorreu um erro ao criar a conta.';
            if (error.code === 'auth/email-already-in-use') {
                message = 'Este e-mail já está em uso.';
            } else if (error.code === 'auth/weak-password') {
                message = 'A senha deve ter pelo menos 6 caracteres.';
            }
            showAuthMessage(message);
        });
});

// Handle Forgot Password
forgotPasswordForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('forgot-email').value;

    if (!email) {
        showAuthMessage('Por favor, digite seu e-mail.');
        return;
    }

    auth.sendPasswordResetEmail(email)
        .then(() => {
            showAuthMessage('E-mail de redefinição enviado! Verifique sua caixa de entrada.', 'success');
        })
        .catch((error) => {
            let message = 'Ocorreu um erro. Tente novamente.';
            if (error.code === 'auth/user-not-found') {
                message = 'Nenhuma conta encontrada com este e-mail.';
            }
            showAuthMessage(message);
        });
});


// --- OBSERVADOR DE ESTADO DE AUTENTICAÇÃO ---
// Redireciona o usuário se ele estiver logado
auth.onAuthStateChanged(user => {
    if (user) {
        // Verifica se o usuário já está na página de dashboard para evitar um loop de redirecionamento.
        if (!window.location.pathname.includes('dashboard.html')) {
            // *** MUDANÇA PRINCIPAL AQUI ***
            // Redireciona para o caminho absoluto do dashboard.
            window.location.href = '/Teste/dashboard.html';
        }
    }
});
