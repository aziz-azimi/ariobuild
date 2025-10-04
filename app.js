// Supabase Configuration
const supabaseUrl = 'https://pqmhgwhsrhsilemwhydj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBxbXFnd2hzcmhzaWxlbXdoeWRqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk0OTY2MDQsImV4cCI6MjA3NTA3MjYwNH0.6dr3WOrP1JftEzUbMwyNfM2ZWXy8WZ62yVJ-n0IIwpM';

const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

// DOM Elements
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const loginBox = document.querySelector('.login-box');
const signupBox = document.getElementById('signupBox');
const showSignup = document.getElementById('showSignup');
const showLogin = document.getElementById('showLogin');
const messageDiv = document.getElementById('message');
const signupMessageDiv = document.getElementById('signupMessage');

// Switch between login and signup forms
showSignup.addEventListener('click', (e) => {
    e.preventDefault();
    loginBox.classList.add('hidden');
    signupBox.classList.remove('hidden');
});

showLogin.addEventListener('click', (e) => {
    e.preventDefault();
    signupBox.classList.add('hidden');
    loginBox.classList.remove('hidden');
});

// Login function
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const loginBtn = document.getElementById('loginBtn');
    const spinner = document.getElementById('spinner');
    
    // Show loading state
    loginBtn.disabled = true;
    spinner.classList.remove('hidden');
    
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (error) {
            showMessage(messageDiv, `خطا در ورود: ${error.message}`, 'error');
        } else {
            showMessage(messageDiv, `✅ خوش آمدید ${data.user.email}! در حال انتقال...`, 'success');
            
            // Redirect to dashboard after 2 seconds
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 2000);
        }
    } catch (error) {
        showMessage(messageDiv, 'خطای غیرمنتظره رخ داد!', 'error');
    } finally {
        // Hide loading state
        loginBtn.disabled = false;
        spinner.classList.add('hidden');
    }
});

// Signup function
signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const signupBtn = document.getElementById('signupBtn');
    const signupSpinner = document.getElementById('signupSpinner');
    
    // Validate passwords match
    if (password !== confirmPassword) {
        showMessage(signupMessageDiv, 'رمز عبور و تکرار آن مطابقت ندارند!', 'error');
        return;
    }
    
    // Validate password length
    if (password.length < 6) {
        showMessage(signupMessageDiv, 'رمز عبور باید حداقل ۶ کاراکتر باشد!', 'error');
        return;
    }
    
    // Show loading state
    signupBtn.disabled = true;
    signupSpinner.classList.remove('hidden');
    
    try {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                emailRedirectTo: window.location.origin
            }
        });

        if (error) {
            showMessage(signupMessageDiv, `خطا در ثبت‌نام: ${error.message}`, 'error');
        } else {
            showMessage(signupMessageDiv, 
                '✅ ثبت‌نام موفقیت‌آمیز! لطفاً ایمیل خود را برای تأیید بررسی کنید.', 
                'success'
            );
            
            // Clear form
            signupForm.reset();
            
            // Switch back to login after 3 seconds
            setTimeout(() => {
                signupBox.classList.add('hidden');
                loginBox.classList.remove('hidden');
                signupMessageDiv.innerHTML = '';
            }, 3000);
        }
    } catch (error) {
        showMessage(signupMessageDiv, 'خطای غیرمنتظره رخ داد!', 'error');
    } finally {
        // Hide loading state
        signupBtn.disabled = false;
        signupSpinner.classList.add('hidden');
    }
});

// Utility function to show messages
function showMessage(element, message, type) {
    element.textContent = message;
    element.className = 'message ' + type;
    element.classList.remove('hidden');
}

// Check if user is already logged in
async function checkAuth() {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
        window.location.href = 'dashboard.html';
    }
}

// Initialize auth check
checkAuth();
