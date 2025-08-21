<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Stolinx - Ativação de Conta</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Sharp" rel="stylesheet">
    <style>
        :root {
            --color-primary: #009688; /* Cor Principal (Teal) */
            --color-danger: #ff7782;
            --color-success: #41f1b6;
            --color-white: #fff;
            --color-info-dark: #7d8da1;
            --color-info-light: #dce1eb;
            --color-dark: #363949;
            --color-primary-variant: #00796B; /* Variante Mais Escura do Teal */
            --color-dark-variant: #677483;
            --color-background: #f6f6f9;
            --border-radius-1: 0.4rem;
            --border-radius-2: 0.8rem;
        }
        * { margin: 0; padding: 0; outline: 0; appearance: none; border: 0; text-decoration: none; list-style: none; box-sizing: border-box; }
        body { font-family: 'Poppins', sans-serif; background: var(--color-background); color: var(--color-dark); overflow: hidden; }
        .auth-main-container { display: grid; grid-template-columns: 45% 55%; height: 100vh; width: 100vw; }
        .left-panel { background: linear-gradient(-45deg, var(--color-primary), var(--color-primary-variant)); color: var(--color-white); display: flex; align-items: center; justify-content: center; padding: 3rem; text-align: center; }
        .branding-content h1 { font-size: 3rem; font-weight: 700; margin-bottom: 1rem; letter-spacing: 1px; }
        .branding-content h1 .danger { color: var(--color-danger); text-shadow: 1px 1px 5px rgba(0,0,0,0.2); }
        .branding-content p { font-size: 1.1rem; font-weight: 300; max-width: 400px; }
        .right-panel { display: flex; align-items: center; justify-content: center; padding: 2rem; }
        #activation-container { width: 100%; display: flex; justify-content: center; }
        .auth-form-wrapper { width: 100%; max-width: 400px; background: var(--color-white); padding: 2.5rem; border-radius: var(--border-radius-2); box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1); }
        .auth-form-wrapper h1 { text-align: center; font-size: 2rem; font-weight: 600; margin-bottom: 0.5rem; }
        .auth-form-wrapper p { text-align: center; color: var(--color-info-dark); margin-bottom: 2.5rem; }
        .input-group { margin-bottom: 1.5rem; }
        .input-group input { width: 100%; padding: 14px; border-radius: var(--border-radius-1); background: var(--color-background); border: 1px solid var(--color-info-light); font-family: 'Poppins', sans-serif; color: var(--color-dark); font-size: 0.95rem; transition: border-color 0.3s ease, box-shadow 0.3s ease; }
        .input-group input:focus { border-color: var(--color-primary); box-shadow: 0 0 0 3px rgba(0, 150, 136, 0.25); }
        .auth-form-wrapper button { width: 100%; padding: 14px; border-radius: var(--border-radius-1); background: var(--color-primary); color: #fff; cursor: pointer; transition: background-color 0.3s ease, transform 0.2s ease; font-family: 'Poppins', sans-serif; font-size: 1rem; font-weight: 500; }
        .auth-form-wrapper button:hover { background: var(--color-primary-variant); transform: translateY(-2px); }
        .support-link, .auth-toggle-link { display: block; text-align: center; margin-top: 1.5rem; color: var(--color-primary); cursor: pointer; font-weight: 500; transition: color 0.3s ease; }
        .support-link:hover, .auth-toggle-link:hover { text-decoration: underline; color: var(--color-primary-variant); }
        #activation-message { text-align: center; padding: 12px; border-radius: var(--border-radius-1); margin-bottom: 1.5rem; display: none; font-weight: 500; color: var(--color-white); }
        #activation-message.success { background-color: var(--color-success); }
        #activation-message.error { background-color: var(--color-danger); }
        @media (max-width: 768px) { .auth-main-container { grid-template-columns: 1fr; } .left-panel { display: none; } .right-panel { background: var(--color-background); } .auth-form-wrapper { box-shadow: none; padding: 1.5rem; } }
    </style>
</head>
<body>
    <div class="auth-main-container">
        <!-- Painel Esquerdo com a marca -->
        <div class="left-panel">
            <div class="branding-content">
                <h1>Quase lá!</h1>
                <p>Ative sua conta para começar a organizar seu negócio e impulsionar suas vendas.</p>
            </div>
        </div>

        <!-- Painel Direito com o formulário de ativação -->
        <div class="right-panel">
            <div id="activation-container">
                <div class="auth-form-wrapper">
                    <form id="activation-form">
                        <h1>Ativação de Conta</h1>
                        <p id="activation-prompt-message">Insira o código de ativação que você recebeu.</p>
                        <div id="activation-message"></div>
                        <div class="input-group">
                            <input type="text" id="activation-code" placeholder="Seu código de ativação" required>
                        </div>
                        <button type="submit" class="btn-success" style="background: var(--color-success);">Ativar Conta</button>
                        <!-- INÍCIO DA ALTERAÇÃO -->
                        <a class="support-link" href="https://wa.me/5579996365824?text=Olá,%20solicito%20meu%20código%20de%20ativação%20para%20o%20Stolinx" target="_blank">Solicite seu código no suporte WhatsApp</a>
                        <!-- FIM DA ALTERAÇÃO -->
                        <a class="auth-toggle-link" id="activation-logout" style="color: var(--color-dark-variant);">Sair</a>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-auth.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-firestore.js"></script>

    <script>
        // --- GLOBAL CONFIG ---
        const firebaseConfig = {
            apiKey: "AIzaSyAv54tgJ5oYrwTSNXpB2rCGjNbhJhe2CoM",
            authDomain: "stolinx-d6e26.firebaseapp.com",
            projectId: "stolinx-d6e26",
            storageBucket: "stolinx-d6e26.appspot.com",
            messagingSenderId: "715535971682",
            appId: "1:715535971682:web:66620d1590ae3e4ba6a83b"
        };

        // --- GLOBAL VARIABLES ---
        let auth, db, currentUserId;
        let firestoreUnsubscribes = [];

        // --- SHARED FUNCTIONS ---

        /**
        * Shows a generic notification modal.
        * @param {string} message The message to display.
        * @param {string} title The title of the modal.
        */
        function showAppNotification(message, title = 'Aviso') {
            const modal = document.getElementById('app-notification-modal');
            document.getElementById('app-notification-title').textContent = title;
            document.getElementById('app-notification-message').textContent = message;
            const buttons = document.getElementById('app-notification-buttons');
            buttons.innerHTML = '<button id="notification-ok-btn" class="btn-success">OK</button>';
            modal.style.display = 'flex';
            document.getElementById('notification-ok-btn').addEventListener('click', () => modal.style.display = 'none');
        }

        /**
        * Shows a confirmation modal with confirm/cancel buttons.
        * @param {string} message The confirmation message.
        * @param {function} onConfirm The function to execute on confirmation.
        * @param {string} title The title of the modal.
        */
        function showAppConfirmation(message, onConfirm, title = 'Confirmação') {
            const modal = document.getElementById('app-notification-modal');
            document.getElementById('app-notification-title').textContent = title;
            document.getElementById('app-notification-message').textContent = message;
            const buttons = document.getElementById('app-notification-buttons');
            buttons.innerHTML = `
                <button id="confirmation-cancel-btn">Cancelar</button>
                <button id="confirmation-ok-btn" class="btn-danger">Confirmar</button>
            `;
            modal.style.display = 'flex';
            document.getElementById('confirmation-ok-btn').addEventListener('click', () => {
                if (typeof onConfirm === 'function') onConfirm();
                modal.style.display = 'none';
            });
            document.getElementById('confirmation-cancel-btn').addEventListener('click', () => modal.style.display = 'none');
        }

        /**
        * Formats a number input as Brazilian currency.
        * @param {HTMLInputElement} input The input element.
        */
        function formatCurrency(input) {
            let value = input.value.replace(/\D/g, '');
            if (value === "") {
                input.value = "";
                return;
            }
            value = (parseInt(value, 10) / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2 });
            input.value = value;
        }


        /**
        * Returns a reference to a user-specific Firestore collection.
        * @param {string} collectionName The name of the collection.
        * @returns {firebase.firestore.CollectionReference}
        */
        function getUserCollection(collectionName) {
            if (!currentUserId) throw new Error("User not logged in!");
            return db.collection('users').doc(currentUserId).collection(collectionName);
        }


        /**
        * Main initialization function for authenticated pages.
        * @param {object} config Configuration object for the page.
        * @param {string} config.page The name of the current page (e.g., 'dashboard').
        * @param {function} config.init The page-specific initialization function.
        */
        function initializeApp(config) {
            // --- Initialize Firebase ---
            if (!firebase.apps.length) {
                firebase.initializeApp(firebaseConfig);
            }
            auth = firebase.auth();
            db = firebase.firestore();

            // --- Authentication Check ---
            auth.onAuthStateChanged(user => {
                if (user) {
                    currentUserId = user.uid;
                    const userRef = db.collection('users').doc(user.uid);

                    userRef.get().then(doc => {
                        if (doc.exists) {
                            const userData = doc.data();
                            const now = new Date();
                            if (userData.active && userData.expiresAt && userData.expiresAt.toDate() > now) {
                                // User is active and can stay, run page-specific logic
                                setupCommonUI(user);
                                if (config.init && typeof config.init === 'function') {
                                    config.init();
                                }
                            } else {
                                // Subscription expired or not active
                                window.location.href = 'ativacao.html';
                            }
                        } else {
                            // Should not happen if user is logged in, but as a fallback...
                            window.location.href = 'index.html';
                        }
                    });
                } else {
                    // User is not logged in
                    window.location.href = 'index.html';
                }
            });
        }

        /**
        * Sets up common UI elements like sidebar, theme, and logout.
        * @param {firebase.User} user The authenticated user object.
        */
        function setupCommonUI(user) {
            // --- Sidebar and Menu ---
            const menuBtn = document.getElementById('menu-btn');
            const closeBtn = document.getElementById('close-btn');
            const aside = document.querySelector('aside');
            if(menuBtn) menuBtn.addEventListener('click', () => aside.classList.add('show-sidebar'));
            if(closeBtn) closeBtn.addEventListener('click', () => aside.classList.remove('show-sidebar'));

            // --- Theme Toggler ---
            const themeTogglerLink = document.getElementById('theme-toggler-link');
            themeTogglerLink.addEventListener('click', (e) => {
                e.preventDefault();
                const isDark = document.body.classList.toggle('dark-theme');
                themeTogglerLink.querySelector('span').textContent = isDark ? 'dark_mode' : 'light_mode';
                localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
            });

            if (localStorage.getItem('darkMode') === 'enabled') {
                document.body.classList.add('dark-theme');
                themeTogglerLink.querySelector('span').textContent = 'dark_mode';
            }

            // --- Logout ---
            document.getElementById('logout-btn').addEventListener('click', (e) => {
                e.preventDefault();
                firestoreUnsubscribes.forEach(unsubscribe => unsubscribe());
                firestoreUnsubscribes = [];
                auth.signOut();
            });

            // --- Welcome Message ---
            const welcomeMessageEl = document.getElementById('welcome-message');
            if (welcomeMessageEl) {
                let userName = user.displayName || user.email.split('@')[0];
                userName = userName.charAt(0).toUpperCase() + userName.slice(1);
                welcomeMessageEl.textContent = `Olá, ${userName}`;
            }
            
            // --- Modal Closing ---
            const notificationModal = document.getElementById('app-notification-modal');
            if(notificationModal) {
                document.getElementById('app-notification-close-btn').addEventListener('click', () => notificationModal.style.display = 'none');
                notificationModal.addEventListener('click', (e) => {
                    if (e.target === notificationModal) {
                        notificationModal.style.display = 'none';
                    }
                });
            }
        }
    </script>
</body>
</html>
