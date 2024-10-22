// Add this to your login.js file or within a <script> tag in your HTML

function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleBtn = document.querySelector('.password-toggle');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleBtn.textContent = '👁️‍🗨️';
    } else {
        passwordInput.type = 'password';
        toggleBtn.textContent = '👁️';
    }
}

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    // Here you would typically send this data to your server for authentication
    console.log('Login attempt:', { username, password, rememberMe });
    
    // For demo purposes, let's just show an alert
    alert('Login functionality would be implemented here.');
});

// Social login buttons (these would need to be integrated with the respective APIs)
document.querySelectorAll('.social-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        alert(`${this.textContent} login would be implemented here.`);
    });
});