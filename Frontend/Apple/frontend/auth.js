document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const errorMessageDiv = document.getElementById('error-message');
    const logoutBtn = document.getElementById('logout-btn');
    const usernameDisplay = document.getElementById('username-display');
    
    const displayError = (messages) => {
        errorMessageDiv.style.display = 'block';
        // If messages is an object, format it. Otherwise, display as is.
        if (typeof messages === 'object' && messages !== null) {
            errorMessageDiv.innerHTML = Object.entries(messages)
                .map(([field, errors]) => `<strong>${field}:</strong> ${errors.join(', ')}`)
                .join('<br>');
        } else {
            errorMessageDiv.innerHTML = messages || 'An unknown error occurred.';
        }
    };

    // --- Token and User Management ---
    const getAccessToken = () => localStorage.getItem('accessToken');

    const handleAuthSuccess = (data) => {
        // Store tokens in localStorage for future authenticated requests
        localStorage.setItem('accessToken', data.access);
        localStorage.setItem('refreshToken', data.refresh); // Used for refreshing the access token

        // Store user details for UI personalization
        localStorage.setItem('userId', data.user.id);
        localStorage.setItem('username', data.user.username);
        localStorage.setItem('userRole', data.user.is_staff ? 'ADMIN' : 'USER');

        // Redirect to the dashboard
        window.location.href = 'dashboard.html';
    };

    // --- Login and Registration ---

    if (loginBtn) {
        document.getElementById('login-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            errorMessageDiv.style.display = 'none';

            const loginForm = document.getElementById('login-form');
            const formData = new FormData(loginForm);
            const data = Object.fromEntries(formData.entries());

            try {
                const response = await fetch(`${API_BASE_URL}/accounts/login/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                const result = await response.json();

                if (!response.ok) {
                    throw result;
                }

                handleAuthSuccess(result);

            } catch (error) {
                displayError(error.error || error.detail || 'Login failed. Please check your credentials.');
            }
        });
    }

    if (registerBtn) {
        document.getElementById('register-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            errorMessageDiv.style.display = 'none';

            const registerForm = document.getElementById('register-form');
            const formData = new FormData(registerForm);
            const data = Object.fromEntries(formData.entries());

            if (data.password !== data.confirm_password) {
                displayError({ password: ["Passwords do not match."] });
                return;
            }

            try {
                const response = await fetch(`${API_BASE_URL}/accounts/register/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                const result = await response.json();

                if (!response.ok) {
                    throw result;
                }

                // Registration successful, now log the user in automatically
                alert('Registration successful! Please log in to continue.');
                window.location.href = 'login.html';

            } catch (error) {
                displayError(error);
            }
        });
    }

    // --- Logout and UI Updates ---

    if (usernameDisplay) {
        const username = localStorage.getItem('username');
        usernameDisplay.textContent = username || 'User';
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            const refreshToken = localStorage.getItem('refreshToken');
            if (refreshToken) {
                try {
                    await fetch(`${API_BASE_URL}/accounts/logout/`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${getAccessToken()}`
                        },
                        body: JSON.stringify({ refresh: refreshToken })
                    });
                } catch (error) {
                    console.error('Logout failed:', error);
                }
            }
            // Clear all user-related data from storage
            localStorage.clear();
            window.location.href = 'login.html';
        });
    }

    // --- Route Protection ---

    const protectedPaths = [
        'dashboard.html', 
        'music_library.html', 
        'my_playlists.html', 
        'my_favorites.html', 
        'my_history.html', 
        'upload_music.html', 
        'admin_analytics.html',
        'admin_dashboard.html'
    ];
    const isProtectedPage = protectedPaths.some(path => window.location.pathname.includes(path));

    // Redirect to login if not authenticated on a protected page
    if (isProtectedPage && !getAccessToken()) {
        window.location.href = 'login.html';
        return; // Stop further script execution
    }

});